/*
 * Owner: Mohiuddin
 * Status: skeleton
 * Acceptance criteria:
 *   - Full events CRUD mirroring /admin/members exactly.
 *   - lib/firestore/events.ts write helpers (createEvent/updateEvent/deleteEvent).
 * Reference: src/app/admin/members/page.tsx (the reference CRUD).
 */
import type { Metadata } from "next";

import { RouteSkeleton } from "@/components/feedback/RouteSkeleton";

export const metadata: Metadata = { title: "Events | Admin" };

export default function AdminEventsPage() {
  return (
    <RouteSkeleton
      eyebrow="Admin"
      title="Events"
      owner="Mohiuddin"
      reference="src/app/admin/members/page.tsx"
      criteria={[
        "Copy the members CRUD: list, new, [id]/edit.",
        "Add createEvent/updateEvent/deleteEvent to lib/firestore/events.ts.",
        "Build an EventForm mirroring MemberForm.",
      ]}
    />
  );
}
