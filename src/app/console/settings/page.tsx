/*
 * Owner: Jashwanth
 * Status: skeleton
 * Acceptance criteria:
 *   - Account settings: profile visibility toggle, email preferences, sign out.
 *   - Danger zone: leave the group (delete member doc) with confirmation.
 * Reference: src/components/forms/MemberForm.tsx isPublic toggle.
 */
import type { Metadata } from "next";

import { RouteSkeleton } from "@/components/feedback/RouteSkeleton";

export const metadata: Metadata = { title: "Settings | Console" };

export default function SettingsPage() {
  return (
    <RouteSkeleton
      eyebrow="Console"
      title="Settings"
      owner="Jashwanth"
      reference="src/components/forms/MemberForm.tsx"
      criteria={[
        "Profile visibility toggle and email preferences.",
        "Sign out control.",
        "Danger zone with a confirm dialog.",
      ]}
    />
  );
}
