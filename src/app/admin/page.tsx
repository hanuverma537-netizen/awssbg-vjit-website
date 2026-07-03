import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  CalendarDays,
  FolderGit2,
  Map,
  ScanLine,
  ArrowUpRight,
} from "lucide-react";

import { routes } from "@/lib/constants/routes";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = { title: "Admin" };

const TILES = [
  {
    href: routes.adminMembers,
    title: "Members",
    description: "Add, edit, and manage member profiles. Reference CRUD.",
    icon: Users,
    ready: true,
  },
  {
    href: routes.adminEvents,
    title: "Events",
    description: "Create and manage events and registrations.",
    icon: CalendarDays,
    ready: false,
  },
  {
    href: routes.adminProjects,
    title: "Projects",
    description: "Curate the projects showcased on the site.",
    icon: FolderGit2,
    ready: false,
  },
  {
    href: routes.adminRoadmap,
    title: "Roadmap",
    description: "Manage roadmap items and their status.",
    icon: Map,
    ready: false,
  },
  {
    href: routes.adminCheckin,
    title: "Check-in",
    description: "Scan tickets to mark attendance at events.",
    icon: ScanLine,
    ready: false,
  },
];

export default function AdminHomePage() {
  return (
    <PageShell
      eyebrow="Control room"
      title="Admin"
      description="Manage the people, events, and projects behind AWS SBG VJIT."
    >
      <Container className="!px-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href}
              className="group bg-card hover:border-orange flex flex-col gap-3 rounded-sm border p-6 transition-colors"
            >
              <div className="flex items-center justify-between">
                <tile.icon className="text-orange size-6" />
                <ArrowUpRight className="text-muted-foreground size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <h2 className="font-display text-lg font-semibold">
                {tile.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                {tile.description}
              </p>
              {!tile.ready ? (
                <span className="text-muted-foreground mt-auto pt-2 font-mono text-xs tracking-wide uppercase">
                  Skeleton
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      </Container>
    </PageShell>
  );
}
