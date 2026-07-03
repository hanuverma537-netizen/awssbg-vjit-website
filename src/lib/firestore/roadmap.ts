import "server-only";

import { getAdminDb } from "@/lib/firebase/admin";
import type { RoadmapItem } from "@/lib/types";

/*
 * Owner: Hanu
 * Status: server reads implemented; voting logic is a stub.
 * Acceptance criteria:
 *   - castVote / removeVote inside a transaction that writes roadmap_votes and
 *     increments/decrements the denormalized voteCount on the item.
 *   - Enforce one vote per (itemId, userId) using the composite doc id.
 * Reference: lib/firestore/members.ts transaction pattern.
 */

const COLLECTION = "roadmap_items";

function toItem(id: string, data: FirebaseFirestore.DocumentData): RoadmapItem {
  return { ...(data as Omit<RoadmapItem, "id">), id };
}

export async function listRoadmapItems(): Promise<RoadmapItem[]> {
  const snap = await getAdminDb()
    .collection(COLLECTION)
    .orderBy("quarter", "asc")
    .get();
  return snap.docs.map((d) => toItem(d.id, d.data()));
}
