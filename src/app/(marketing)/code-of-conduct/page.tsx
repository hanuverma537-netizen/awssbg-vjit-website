/*
 * Owner: Laasya
 * Status: skeleton
 * Acceptance criteria:
 *   - Real code of conduct: expected behaviour, what is not tolerated, and how
 *     to report an issue to the core team.
 *   - Scope: events, online spaces, and project collaboration.
 *   - Keep it clear and enforceable; no filler.
 * Reference: src/app/(marketing)/about/page.tsx for structure.
 */
import type { Metadata } from "next";

import { RouteSkeleton } from "@/components/feedback/RouteSkeleton";

export const metadata: Metadata = {
  title: "Code of Conduct",
  description: "How we treat each other in AWS SBG VJIT.",
};

export default function CodeOfConductPage() {
  return (
    <div className="pt-16">
      <RouteSkeleton
        eyebrow="Legal"
        title="Code of Conduct"
        owner="Laasya"
        reference="src/app/(marketing)/about/page.tsx"
        criteria={[
          "State expected behaviour and what is not tolerated.",
          "Cover events, online spaces, and project work.",
          "Give a clear reporting path to the core team.",
        ]}
      />
    </div>
  );
}
