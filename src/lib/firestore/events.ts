import "server-only";

import { getAdminDb } from "@/lib/firebase/admin";
import type { Event } from "@/lib/types";

/*
 * Owner: Mohiuddin
 * Status: server reads implemented; write/mutation helpers are stubs.
 * Acceptance criteria:
 *   - createEvent / updateEvent / deleteEvent mirroring the members CRUD pattern.
 *   - listEvents with status + date filters and pagination.
 * Reference: lib/firestore/members.ts (writes) and members.server.ts (reads).
 */

const COLLECTION = "events";

function toEvent(id: string, data: FirebaseFirestore.DocumentData): Event {
  return { ...(data as Omit<Event, "id">), id };
}

export async function listEvents(): Promise<Event[]> {
  const snap = await getAdminDb()
    .collection(COLLECTION)
    .orderBy("startAt", "desc")
    .get();
  return snap.docs.map((d) => toEvent(d.id, d.data()));
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const snap = await getAdminDb()
    .collection(COLLECTION)
    .where("slug", "==", slug)
    .limit(1)
    .get();
  const first = snap.docs[0];
  return first ? toEvent(first.id, first.data()) : null;
}

/** Fetch multiple events by id. Batched in groups of 30 (Firestore `in` cap). */
export async function getEventsByIds(ids: string[]): Promise<Event[]> {
  if (ids.length === 0) return [];
  const { FieldPath } = await import("firebase-admin/firestore");
  const out: Event[] = [];
  for (let i = 0; i < ids.length; i += 30) {
    const batch = ids.slice(i, i + 30);
    const snap = await getAdminDb()
      .collection(COLLECTION)
      .where(FieldPath.documentId(), "in", batch)
      .get();
    out.push(...snap.docs.map((d) => toEvent(d.id, d.data())));
  }
  return out;
}

/** The most relevant event for the landing hero: a live one, else next upcoming. */
export async function getFeaturedEvent(): Promise<Event | null> {
  const live = await getAdminDb()
    .collection(COLLECTION)
    .where("status", "==", "live")
    .orderBy("startAt", "asc")
    .limit(1)
    .get();
  if (live.docs[0]) return toEvent(live.docs[0].id, live.docs[0].data());

  const upcoming = await getAdminDb()
    .collection(COLLECTION)
    .where("status", "==", "upcoming")
    .orderBy("startAt", "asc")
    .limit(1)
    .get();
  return upcoming.docs[0]
    ? toEvent(upcoming.docs[0].id, upcoming.docs[0].data())
    : null;
}
