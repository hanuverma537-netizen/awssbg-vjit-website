/*
 * Owner: Aarush
 * Status: skeleton
 * Acceptance criteria:
 *   - Real story of AWS SBG VJIT: what it is, who it is for, how to get involved.
 *   - Values section and a photo strip (next/image, no fake numbers).
 *   - Link to /join and /team.
 * Reference: src/app/(marketing)/page.tsx for section patterns.
 */
import type { Metadata } from "next";

import { RouteSkeleton } from "@/components/feedback/RouteSkeleton";

export const metadata: Metadata = {
  title: "About",
  description: "What AWS SBG VJIT is and who it is for.",
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <RouteSkeleton
        eyebrow="About"
        title="About AWS SBG VJIT"
        owner="Aarush"
        reference="src/app/(marketing)/page.tsx"
        criteria={[
          "Write the real origin and mission (no invented stats).",
          "Values section plus a photo strip using next/image.",
          "Clear calls to action to /join and /team.",
        ]}
      />
    </div>
  );
}
