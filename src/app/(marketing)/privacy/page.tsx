/*
 * Owner: Laasya
 * Status: skeleton
 * Acceptance criteria:
 *   - Real, plain-language privacy policy: what data we collect (Google auth
 *     profile, member profile fields, event registrations) and why.
 *   - How data is stored (Firebase) and how a member can request deletion.
 *   - No fabricated claims. Keep it honest and short.
 * Reference: src/app/(marketing)/about/page.tsx for structure.
 */
import type { Metadata } from "next";

import { RouteSkeleton } from "@/components/feedback/RouteSkeleton";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How AWS SBG VJIT handles your data.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-16">
      <RouteSkeleton
        eyebrow="Legal"
        title="Privacy"
        owner="Laasya"
        reference="src/app/(marketing)/about/page.tsx"
        criteria={[
          "List exactly what data is collected and why.",
          "Explain storage (Firebase) and deletion requests.",
          "Plain language, honest, no boilerplate filler.",
        ]}
      />
    </div>
  );
}
