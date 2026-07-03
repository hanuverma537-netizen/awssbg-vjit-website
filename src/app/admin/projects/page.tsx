/*
 * Owner: Akshithi
 * Status: skeleton
 * Acceptance criteria:
 *   - Full projects CRUD mirroring /admin/members.
 *   - lib/firestore/projects.ts write helpers.
 * Reference: src/app/admin/members/page.tsx (the reference CRUD).
 */
import type { Metadata } from "next";

import { RouteSkeleton } from "@/components/feedback/RouteSkeleton";

export const metadata: Metadata = { title: "Projects | Admin" };

export default function AdminProjectsPage() {
  return (
    <RouteSkeleton
      eyebrow="Admin"
      title="Projects"
      owner="Akshithi"
      reference="src/app/admin/members/page.tsx"
      criteria={[
        "Copy the members CRUD: list, new, [id]/edit.",
        "Add createProject/updateProject/deleteProject helpers.",
        "Build a ProjectForm mirroring MemberForm.",
      ]}
    />
  );
}
