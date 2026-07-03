/*
 * Owner: Jashwanth
 * Status: skeleton
 * Acceptance criteria:
 *   - List the member's registrations with status and each event's QR ticket.
 *   - Data via lib/firestore/registrations.ts (getRegistrationsForUser).
 * Reference: src/components/qr/QRDisplay.tsx; lib/firestore/registrations.ts.
 */
import type { Metadata } from "next";

import { RouteSkeleton } from "@/components/feedback/RouteSkeleton";

export const metadata: Metadata = { title: "My events | Console" };

export default function MyEventsPage() {
  return (
    <RouteSkeleton
      eyebrow="Console"
      title="My events"
      owner="Jashwanth"
      reference="lib/firestore/registrations.ts"
      criteria={[
        "List the member's registrations with status.",
        "Show each event's QR ticket via QRDisplay.",
        "Empty state when the member has no registrations.",
      ]}
    />
  );
}
