/*
 * Owner: Jashwanth
 * Status: skeleton
 * Acceptance criteria:
 *   - Personalized dashboard: profile completeness, upcoming registered events,
 *     quick links.
 *   - First-run nudge to complete the member profile.
 * Reference: /admin page tiles; lib/auth/server.ts getCurrentUser.
 */
import type { Metadata } from "next";

import { getCurrentUser } from "@/lib/auth/server";
import { routes } from "@/lib/constants/routes";
import { firstName } from "@/lib/utils/format";
import { RouteSkeleton } from "@/components/feedback/RouteSkeleton";

export const metadata: Metadata = { title: "Console" };

export default async function ConsolePage() {
  const user = await getCurrentUser();
  const name = user?.name ? firstName(user.name) : "there";

  return (
    <RouteSkeleton
      eyebrow="Your space"
      title={`Welcome, ${name}`}
      description="Your console dashboard. Build the real overview here."
      owner="Jashwanth"
      reference={routes.consoleProfile}
      criteria={[
        "Show profile completeness and a nudge to finish it.",
        "List upcoming events the member is registered for.",
        "Quick links to profile, tickets, and settings.",
      ]}
    />
  );
}
