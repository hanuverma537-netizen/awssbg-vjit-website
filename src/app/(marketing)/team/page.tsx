/*
 * Owner: Aarush
 * Status: skeleton (reads public core/lead members)
 * Acceptance criteria:
 *   - Show core and lead members grouped by team.
 *   - Use MemberCard; link to /m/[username].
 * Reference: src/app/(marketing)/page.tsx members glance.
 */
import type { Metadata } from "next";

import { safe } from "@/lib/utils/safe";
import { getPublicMembers } from "@/lib/firestore/members.server";
import { RouteSkeleton } from "@/components/feedback/RouteSkeleton";
import { MemberCard } from "@/components/cards/MemberCard";
import { EmptyState } from "@/components/feedback/EmptyState";

export const metadata: Metadata = {
  title: "Team",
  description: "The core and leads running AWS SBG VJIT.",
};

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const members = await safe(getPublicMembers(100), [], "team:list");
  const team = members.filter((m) => m.role === "core" || m.role === "lead");

  return (
    <div className="pt-16">
      <RouteSkeleton
        eyebrow="The core"
        title="Team"
        owner="Aarush"
        reference="src/app/(marketing)/page.tsx"
        criteria={[
          "Group core and lead members by their team.",
          "Rich member cards linking to /m/[username].",
          "Empty state before members are seeded.",
        ]}
      >
        {team.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <EmptyState title="Team coming soon" />
        )}
      </RouteSkeleton>
    </div>
  );
}
