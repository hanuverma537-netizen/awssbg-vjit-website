/*
 * Owner: Hanu
 * Status: skeleton
 * Acceptance criteria:
 *   - Full roadmap CRUD mirroring /admin/members.
 *   - Manage status transitions; voteCount is read-only here (mutated by votes).
 * Reference: src/app/admin/members/page.tsx (the reference CRUD).
 */
import type { Metadata } from "next";

import { RouteSkeleton } from "@/components/feedback/RouteSkeleton";

export const metadata: Metadata = { title: "Roadmap | Admin" };

export default function AdminRoadmapPage() {
  return (
    <RouteSkeleton
      eyebrow="Admin"
      title="Roadmap"
      owner="Hanu"
      reference="src/app/admin/members/page.tsx"
      criteria={[
        "Copy the members CRUD for roadmap items.",
        "Manage status transitions (proposed to shipped).",
        "Leave voteCount read-only; it is updated by member votes.",
      ]}
    />
  );
}
