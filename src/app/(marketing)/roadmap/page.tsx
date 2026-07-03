/*
 * Owner: Hanu
 * Status: skeleton (reads roadmap items; voting is NOT built)
 * Acceptance criteria:
 *   - Board grouped by status; items grouped by quarter.
 *   - Upvote control wired to a transaction (roadmap_votes + voteCount).
 *     Enforce one vote per (itemId, userId). See lib/firestore/roadmap.ts TODOs.
 *   - Signed-out users are prompted to sign in before voting.
 * Reference: /admin/members transaction pattern; lib/firestore/members.ts.
 */
import type { Metadata } from "next";

import { safe } from "@/lib/utils/safe";
import { listRoadmapItems } from "@/lib/firestore/roadmap";
import { RouteSkeleton } from "@/components/feedback/RouteSkeleton";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/feedback/EmptyState";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "What AWS SBG VJIT is planning next. Vote on what matters.",
};

export const dynamic = "force-dynamic";

export default async function RoadmapPage() {
  const items = await safe(listRoadmapItems(), [], "roadmap:list");

  return (
    <div className="pt-16">
      <RouteSkeleton
        eyebrow="What's next"
        title="Roadmap"
        owner="Hanu"
        reference="lib/firestore/members.ts (transaction pattern)"
        criteria={[
          "Board grouped by status and quarter.",
          "Upvote via transaction; one vote per member per item.",
          "Prompt sign-in before voting.",
        ]}
      >
        {items.length > 0 ? (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-4 rounded-sm border p-4"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <Badge variant="secondary" className="capitalize">
                    {item.status}
                  </Badge>
                  <span className="text-muted-foreground font-mono text-xs">
                    {item.quarter}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="Roadmap coming soon" />
        )}
      </RouteSkeleton>
    </div>
  );
}
