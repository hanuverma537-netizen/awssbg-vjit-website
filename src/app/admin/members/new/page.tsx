import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { NewMemberForm } from "@/components/admin/NewMemberForm";

export const metadata: Metadata = { title: "Add member | Admin" };

export default function NewMemberPage() {
  return (
    <PageShell
      eyebrow="Members"
      title="Add member"
      description="Create a member profile. All writes go through the typed Firestore helpers."
    >
      <NewMemberForm />
    </PageShell>
  );
}
