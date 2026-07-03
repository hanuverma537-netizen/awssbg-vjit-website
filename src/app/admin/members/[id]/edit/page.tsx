import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { safe } from "@/lib/utils/safe";
import { getMemberById } from "@/lib/firestore/members.server";
import type { MemberFormValues } from "@/lib/types";
import { PageShell } from "@/components/layout/PageShell";
import { EditMemberForm } from "@/components/admin/EditMemberForm";

export const metadata: Metadata = { title: "Edit member | Admin" };
export const dynamic = "force-dynamic";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await safe(getMemberById(id), null, "admin:editMember");
  if (!member) notFound();

  // Strip server-only timestamps; the form only edits editable fields.
  const initialValues: MemberFormValues = {
    username: member.username,
    displayName: member.displayName,
    email: member.email,
    photoURL: member.photoURL,
    role: member.role,
    team: member.team,
    cohortYear: member.cohortYear,
    batchYear: member.batchYear,
    branch: member.branch,
    bio: member.bio,
    skills: member.skills,
    socials: member.socials,
    isPublic: member.isPublic,
  };

  return (
    <PageShell
      eyebrow="Members"
      title={`Edit ${member.displayName}`}
      description={`@${member.username}`}
    >
      <EditMemberForm id={member.id} initialValues={initialValues} />
    </PageShell>
  );
}
