import "server-only";

import { getAdminDb } from "@/lib/firebase/admin";
import type { Registration } from "@/lib/types";

/*
 * Owner: Mohiuddin
 * Status: server reads implemented; registration + check-in mutation logic is a
 * stub (see src/app/api/registration/route.ts and src/app/api/checkin/route.ts).
 * Acceptance criteria:
 *   - createRegistration inside a transaction that enforces the unique
 *     (eventId, userId) pair, capacity, and open registration window.
 *   - markAttended flipping status to "attended" with checkedInBy + attendedAt.
 * Reference: lib/firestore/members.ts transaction pattern; lib/qr/ticket.ts.
 */

const COLLECTION = "registrations";

function toRegistration(
  id: string,
  data: FirebaseFirestore.DocumentData,
): Registration {
  return { ...(data as Omit<Registration, "id">), id };
}

export async function getRegistrationsForUser(
  userId: string,
): Promise<Registration[]> {
  const snap = await getAdminDb()
    .collection(COLLECTION)
    .where("userId", "==", userId)
    .get();
  return snap.docs.map((d) => toRegistration(d.id, d.data()));
}

export async function getAttendedEventIds(userId: string): Promise<string[]> {
  const snap = await getAdminDb()
    .collection(COLLECTION)
    .where("userId", "==", userId)
    .where("status", "==", "attended")
    .get();
  return snap.docs.map((d) => d.get("eventId") as string);
}

export async function getExistingRegistration(
  eventId: string,
  userId: string,
): Promise<Registration | null> {
  const snap = await getAdminDb()
    .collection(COLLECTION)
    .where("eventId", "==", eventId)
    .where("userId", "==", userId)
    .limit(1)
    .get();
  const first = snap.docs[0];
  return first ? toRegistration(first.id, first.data()) : null;
}
