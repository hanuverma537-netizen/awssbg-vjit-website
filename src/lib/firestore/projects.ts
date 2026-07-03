import "server-only";

import { getAdminDb } from "@/lib/firebase/admin";
import type { Project } from "@/lib/types";

/*
 * Owner: Akshithi
 * Status: server reads implemented; write/mutation helpers are stubs.
 * Acceptance criteria:
 *   - createProject / updateProject / deleteProject mirroring members CRUD.
 *   - Filtering by stack and featured flag on the projects index.
 * Reference: lib/firestore/members.ts and members.server.ts.
 */

const COLLECTION = "projects";

function toProject(id: string, data: FirebaseFirestore.DocumentData): Project {
  return { ...(data as Omit<Project, "id">), id };
}

export async function listProjects(): Promise<Project[]> {
  const snap = await getAdminDb()
    .collection(COLLECTION)
    .orderBy("createdAt", "desc")
    .get();
  return snap.docs.map((d) => toProject(d.id, d.data()));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const snap = await getAdminDb()
    .collection(COLLECTION)
    .where("slug", "==", slug)
    .limit(1)
    .get();
  const first = snap.docs[0];
  return first ? toProject(first.id, first.data()) : null;
}

export async function getFeaturedProjects(max = 3): Promise<Project[]> {
  const snap = await getAdminDb()
    .collection(COLLECTION)
    .where("featured", "==", true)
    .limit(max)
    .get();
  return snap.docs.map((d) => toProject(d.id, d.data()));
}

export async function getProjectsByContributor(
  uid: string,
): Promise<Project[]> {
  const snap = await getAdminDb()
    .collection(COLLECTION)
    .where("contributors", "array-contains", uid)
    .get();
  return snap.docs.map((d) => toProject(d.id, d.data()));
}
