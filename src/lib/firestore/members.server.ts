import "server-only";

import { getAdminDb } from "@/lib/firebase/admin";
import type { Member } from "@/lib/types";

/*
 * Server-side reads for the members collection via the Admin SDK. Used by
 * Server Components (landing, profile, admin list/edit). Writes go through the
 * client-SDK helpers in members.ts.
 */

const COLLECTION = "members";

function toMember(id: string, data: FirebaseFirestore.DocumentData): Member {
  return { ...(data as Omit<Member, "id">), id };
}

export async function listMembers(): Promise<Member[]> {
  const snap = await getAdminDb()
    .collection(COLLECTION)
    .orderBy("displayName")
    .get();
  return snap.docs.map((d) => toMember(d.id, d.data()));
}

export async function getMemberById(id: string): Promise<Member | null> {
  const snap = await getAdminDb().collection(COLLECTION).doc(id).get();
  if (!snap.exists) return null;
  return toMember(snap.id, snap.data() as FirebaseFirestore.DocumentData);
}

export async function getMemberByUsername(
  username: string,
): Promise<Member | null> {
  const snap = await getAdminDb()
    .collection(COLLECTION)
    .where("username", "==", username.toLowerCase())
    .limit(1)
    .get();
  const first = snap.docs[0];
  if (!first) return null;
  return toMember(first.id, first.data());
}

export async function getPublicMembers(max = 100): Promise<Member[]> {
  const snap = await getAdminDb()
    .collection(COLLECTION)
    .where("isPublic", "==", true)
    .limit(max)
    .get();
  return snap.docs.map((d) => toMember(d.id, d.data()));
}

/** A small, shuffled sample of public members for the landing "glance" grid. */
export async function getRandomPublicMembers(count: number): Promise<Member[]> {
  const pool = await getPublicMembers(100);
  // Deterministic-enough shuffle without Math.random: rotate by pool length.
  const rotated = [...pool];
  const offset = pool.length % Math.max(count, 1);
  rotated.push(...rotated.splice(0, offset));
  return rotated.slice(0, count);
}
