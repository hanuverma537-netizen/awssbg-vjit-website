/*
 * REFERENCE IMPLEMENTATION.
 * Copy this pattern for /admin/events, /admin/projects, /admin/roadmap.
 * Files to mirror:
 *   - list page (this file)
 *   - new/page.tsx
 *   - [id]/edit/page.tsx
 *   - lib/firestore/<collection>.ts
 *   - components/forms/<Entity>Form.tsx
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { routes } from "@/lib/constants/routes";
import { safe } from "@/lib/utils/safe";
import { listMembers } from "@/lib/firestore/members.server";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { MembersTable, type MemberRow } from "@/components/admin/MembersTable";

export const metadata: Metadata = { title: "Members | Admin" };
export const dynamic = "force-dynamic";

export default async function AdminMembersPage() {
  const members = await safe(listMembers(), [], "admin:members");

  const rows: MemberRow[] = members.map((m) => ({
    id: m.id,
    username: m.username,
    displayName: m.displayName,
    photoURL: m.photoURL,
    role: m.role,
    team: m.team,
    isPublic: m.isPublic,
  }));

  return (
    <PageShell
      eyebrow="Reference CRUD"
      title="Members"
      description="The full create, read, update, delete pattern. Every other admin CRUD copies this."
      actions={
        <Button asChild>
          <Link href={routes.adminMemberNew}>
            <Plus className="size-4" />
            Add member
          </Link>
        </Button>
      }
    >
      <MembersTable members={rows} />
    </PageShell>
  );
}
