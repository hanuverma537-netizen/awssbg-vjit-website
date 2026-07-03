/*
 * Firestore seed script. Run with: pnpm seed
 *
 * Requires a service account key at secrets/service-account.json (gitignored).
 * See the README "Deployment" section for how to generate it. Also reads
 * SEED_ADMIN_UID and SEED_ADMIN_EMAIL from the environment.
 *
 * Idempotent: uses set with merge and checks username reservations before
 * creating them, so running it repeatedly is safe.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

import { initializeApp, cert, getApps, type App } from "firebase-admin/app";
import {
  getFirestore,
  FieldValue,
  Timestamp,
  type Firestore,
} from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

import type { MemberRole } from "../src/lib/types/member";

const KEY_PATH = resolve(process.cwd(), "secrets/service-account.json");

function initApp(): App {
  if (getApps().length > 0) return getApps()[0]!;
  if (!existsSync(KEY_PATH)) {
    console.error(
      `Missing service account key at ${KEY_PATH}.\n` +
        "Generate one in Firebase console > Project settings > Service accounts,\n" +
        "then save it as secrets/service-account.json (it is gitignored).",
    );
    process.exit(1);
  }
  const serviceAccount = JSON.parse(readFileSync(KEY_PATH, "utf8"));
  return initializeApp({ credential: cert(serviceAccount) });
}

const app = initApp();
const db: Firestore = getFirestore(app);
const auth = getAuth(app);

const now = FieldValue.serverTimestamp();

type SeedMember = {
  uid: string;
  username: string;
  displayName: string;
  email: string;
  role: MemberRole;
  team: string | null;
  branch: string;
  batchYear: number;
  bio: string;
  skills: string[];
};

async function reserveUsername(username: string, uid: string): Promise<void> {
  const ref = db.collection("usernames").doc(username);
  const snap = await ref.get();
  if (!snap.exists) await ref.set({ uid });
}

async function upsertMember(m: SeedMember): Promise<void> {
  await db.collection("members").doc(m.uid).set(
    {
      id: m.uid,
      username: m.username,
      displayName: m.displayName,
      email: m.email,
      photoURL: null,
      role: m.role,
      team: m.team,
      cohortYear: 2026,
      batchYear: m.batchYear,
      branch: m.branch,
      bio: m.bio,
      skills: m.skills,
      socials: {},
      isPublic: true,
      createdAt: now,
      updatedAt: now,
    },
    { merge: true },
  );
  await reserveUsername(m.username, m.uid);
}

async function seedAdmin(): Promise<void> {
  const uid = process.env.SEED_ADMIN_UID;
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@awssbg-vjit.dev";
  if (!uid) {
    console.warn(
      "SEED_ADMIN_UID not set; skipping admin claim and admin member.",
    );
    return;
  }

  await auth.setCustomUserClaims(uid, { admin: true });
  await db.collection("admin_users").doc(uid).set(
    {
      id: uid,
      email,
      grantedBy: "seed",
      grantedAt: now,
    },
    { merge: true },
  );
  await upsertMember({
    uid,
    username: "vedant",
    displayName: "Vedant Idlgave",
    email,
    role: "core",
    team: "Tech",
    branch: "CSE",
    batchYear: 2028,
    bio: "Building AWS SBG VJIT from the ground up. Cloud, web, and everything in between.",
    skills: ["Next.js", "AWS", "TypeScript", "Firebase"],
  });
  console.info(`Seeded admin: ${email} (uid ${uid}) with admin claim.`);
}

async function seedMembers(): Promise<void> {
  const members: SeedMember[] = [
    {
      uid: "seed-member-mohiuddin",
      username: "mohiuddin",
      displayName: "Mohiuddin Khan",
      email: "mohiuddin@vjit.ac.in",
      role: "lead",
      team: "Events",
      branch: "CSE",
      batchYear: 2027,
      bio: "Runs events and check-ins. If there is a hackathon, he is behind it.",
      skills: ["Node.js", "AWS Lambda", "Event Ops"],
    },
    {
      uid: "seed-member-jashwanth",
      username: "jashwanth",
      displayName: "Jashwanth Reddy",
      email: "jashwanth@vjit.ac.in",
      role: "lead",
      team: "Product",
      branch: "IT",
      batchYear: 2027,
      bio: "Owns the member console and profiles.",
      skills: ["React", "Firebase Auth", "UX"],
    },
    {
      uid: "seed-member-akshithi",
      username: "akshithi",
      displayName: "Akshithi Sharma",
      email: "akshithi@vjit.ac.in",
      role: "member",
      team: "Projects",
      branch: "CSE",
      batchYear: 2028,
      bio: "Curates and ships the projects showcase.",
      skills: ["Python", "S3", "DynamoDB"],
    },
    {
      uid: "seed-member-aarush",
      username: "aarush",
      displayName: "Aarush Verma",
      email: "aarush@vjit.ac.in",
      role: "member",
      team: "Community",
      branch: "ECE",
      batchYear: 2028,
      bio: "Grows the community and keeps the directory alive.",
      skills: ["Content", "Community", "EC2"],
    },
    {
      uid: "seed-member-hanu",
      username: "hanu",
      displayName: "Hanumanth Rao",
      email: "hanu@vjit.ac.in",
      role: "member",
      team: "Strategy",
      branch: "CSE",
      batchYear: 2029,
      bio: "Plots the roadmap and rallies votes.",
      skills: ["Roadmapping", "AWS Amplify"],
    },
  ];

  for (const m of members) await upsertMember(m);
  console.info(`Seeded ${members.length} sample members.`);
}

async function seedEvents(): Promise<void> {
  const events = [
    {
      id: "seed-event-cloud-101",
      slug: "cloud-101-workshop",
      title: "Cloud 101: Your First Deploy",
      tagline: "From zero to a live app on AWS in one evening.",
      description:
        "A hands-on intro to AWS. Bring a laptop; leave with something deployed.",
      category: "workshop" as const,
      status: "upcoming" as const,
      startAt: Timestamp.fromDate(new Date("2026-08-14T17:00:00+05:30")),
      endAt: Timestamp.fromDate(new Date("2026-08-14T19:30:00+05:30")),
      venue: "Seminar Hall, VJIT",
      capacity: 80,
      registrationOpen: true,
      registrationDeadline: Timestamp.fromDate(
        new Date("2026-08-13T23:59:00+05:30"),
      ),
      externalLink: null,
      outcomes: [],
    },
    {
      id: "seed-event-hack-night",
      slug: "cloud-hack-night",
      title: "Cloud Hack Night",
      tagline: "One night, one build, real AWS credits.",
      description: "An overnight build sprint on AWS. Teams of up to four.",
      category: "hackathon" as const,
      status: "past" as const,
      startAt: Timestamp.fromDate(new Date("2026-03-21T18:00:00+05:30")),
      endAt: Timestamp.fromDate(new Date("2026-03-22T06:00:00+05:30")),
      venue: "Innovation Lab, VJIT",
      capacity: null,
      registrationOpen: false,
      registrationDeadline: null,
      externalLink: null,
      outcomes: ["12 projects built", "3 taken forward as club projects"],
    },
  ];

  for (const e of events) {
    await db
      .collection("events")
      .doc(e.id)
      .set(
        { ...e, coverImage: "", gallery: [], createdAt: now, updatedAt: now },
        {
          merge: true,
        },
      );
  }
  console.info(`Seeded ${events.length} sample events.`);
}

async function seedProjects(): Promise<void> {
  const projects = [
    {
      id: "seed-project-ticketing",
      slug: "sbg-ticketing",
      title: "SBG Ticketing",
      tagline: "QR check-in for club events, built on AWS.",
      description:
        "Signed QR tickets, camera check-in, and attendance records.",
      stack: ["Next.js", "Firebase", "AWS SES"],
      contributors: ["seed-member-mohiuddin"],
      repoUrl: null,
      liveUrl: null,
      architectureDiagram: null,
      featured: true,
    },
    {
      id: "seed-project-notes",
      slug: "campus-notes",
      title: "Campus Notes",
      tagline: "Shared, searchable notes for VJIT courses.",
      description: "A serverless notes app with full-text search.",
      stack: ["React", "DynamoDB", "Lambda"],
      contributors: ["seed-member-akshithi", "seed-member-aarush"],
      repoUrl: null,
      liveUrl: null,
      architectureDiagram: null,
      featured: false,
    },
    {
      id: "seed-project-roadmap",
      slug: "roadmap-voting",
      title: "Roadmap Voting",
      tagline: "Let members vote on what the club builds next.",
      description: "Transactional voting with denormalized counts.",
      stack: ["Next.js", "Firestore"],
      contributors: ["seed-member-hanu"],
      repoUrl: null,
      liveUrl: null,
      architectureDiagram: null,
      featured: false,
    },
  ];

  for (const p of projects) {
    await db
      .collection("projects")
      .doc(p.id)
      .set(
        { ...p, coverImage: "", createdAt: now, updatedAt: now },
        {
          merge: true,
        },
      );
  }
  console.info(`Seeded ${projects.length} sample projects.`);
}

async function seedRoadmap(): Promise<void> {
  const items = [
    {
      id: "seed-roadmap-certs",
      title: "AWS certification study group",
      description: "Weekly sessions toward Cloud Practitioner.",
      quarter: "2026-Q3",
      status: "planned" as const,
      category: "initiative" as const,
    },
    {
      id: "seed-roadmap-serverless",
      title: "Serverless workshop series",
      description: "Three-part build with Lambda, API Gateway, and DynamoDB.",
      quarter: "2026-Q3",
      status: "in-progress" as const,
      category: "workshop" as const,
    },
    {
      id: "seed-roadmap-demo-day",
      title: "End of semester demo day",
      description: "Members present what they shipped.",
      quarter: "2026-Q4",
      status: "proposed" as const,
      category: "event" as const,
    },
    {
      id: "seed-roadmap-site",
      title: "Launch the club website",
      description: "This site. Ship v1 and iterate.",
      quarter: "2026-Q3",
      status: "shipped" as const,
      category: "project" as const,
    },
  ];

  for (const item of items) {
    await db
      .collection("roadmap_items")
      .doc(item.id)
      .set(
        { ...item, voteCount: 0, createdAt: now, updatedAt: now },
        {
          merge: true,
        },
      );
  }
  console.info(`Seeded ${items.length} roadmap items.`);
}

async function main(): Promise<void> {
  console.info("Seeding Firestore...");
  await seedAdmin();
  await seedMembers();
  await seedEvents();
  await seedProjects();
  await seedRoadmap();
  console.info("Seed complete.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
