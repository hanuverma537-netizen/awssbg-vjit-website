/*
 * Owner: Akshithi
 * Status: skeleton (real fetch + notFound; presentation TODO)
 * Acceptance criteria:
 *   - Full project detail: description, stack, contributors (link to /m/[username]),
 *     repo/live links, architecture diagram.
 *   - OG image from cover.
 * Reference: src/app/(marketing)/m/[username]/page.tsx layout patterns.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { safe } from "@/lib/utils/safe";
import { getProjectBySlug } from "@/lib/firestore/projects";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await safe(getProjectBySlug(slug), null, "project:meta");
  if (!project) return { title: "Project" };
  return { title: project.title, description: project.tagline };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await safe(getProjectBySlug(slug), null, "project:detail");
  if (!project) notFound();

  return (
    <div className="pt-16">
      <Container>
        <div className="max-w-3xl py-14">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            {project.title}
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            {project.tagline}
          </p>
          {project.stack.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="outline" className="font-mono">
                  {tech}
                </Badge>
              ))}
            </div>
          ) : null}
          {/* TODO(Akshithi): contributors, repo/live links, diagram, description. */}
          <p className="text-muted-foreground mt-8 leading-relaxed whitespace-pre-line">
            {project.description || "Project write-up coming soon."}
          </p>
        </div>
      </Container>
    </div>
  );
}
