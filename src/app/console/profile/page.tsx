/*
 * Owner: Jashwanth
 * Status: skeleton
 * Acceptance criteria (see also src/components/forms/MemberForm.tsx):
 *   - Client form using react-hook-form + memberFormSchema (lib/types/member.ts).
 *   - Username uniqueness check + reservation transaction: read usernames/{username},
 *     create it in the SAME transaction as the member update (see members.ts).
 *   - Photo upload via Firebase Storage (members/{uid}/...).
 *   - Show a live preview link to /m/[username] at the top.
 *   - Handle the first-time flow where the user has no member doc yet.
 * Reference: src/components/forms/MemberForm.tsx and lib/firestore/members.ts.
 */
import type { Metadata } from "next";

import { routes } from "@/lib/constants/routes";
import { RouteSkeleton } from "@/components/feedback/RouteSkeleton";

export const metadata: Metadata = { title: "Profile | Console" };

export default function ConsoleProfilePage() {
  return (
    <RouteSkeleton
      eyebrow="Console"
      title="Your profile"
      description="Reuse MemberForm here and wire the self-service save path."
      owner="Jashwanth"
      reference="src/components/forms/MemberForm.tsx"
      criteria={[
        "Render MemberForm with the member's current values.",
        "Enforce username uniqueness via a reservation transaction.",
        "Upload photos to Firebase Storage; preview /m/[username].",
        "Support the first-time flow (no member doc yet).",
      ]}
    >
      <p className="text-muted-foreground text-sm">
        New members are routed here after first sign-in to complete their
        profile before anything else ({routes.consoleProfile}).
      </p>
    </RouteSkeleton>
  );
}
