# AWS SBG VJIT

Official website of the AWS Student Builder Group at Vidya Jyothi Institute of
Technology, Hyderabad. A place to learn cloud fundamentals, build real projects,
and ship them on AWS.

<!-- Screenshot: add after first deploy. -->

## Stack

- Next.js 15 (App Router) and React 19
- TypeScript (strict, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- Tailwind CSS v4 (CSS-first `@theme` in `globals.css`) and shadcn/ui (new-york)
- Framer Motion, GSAP + ScrollTrigger, Lenis smooth scroll
- Firebase (Auth, Firestore, Storage) with the Firebase Admin SDK server-side
- Resend for transactional email
- `qrcode.react` (tickets) and `html5-qrcode` (check-in scanner)
- Zod, react-hook-form, date-fns, sonner, next-themes, lucide-react
- pnpm, ESLint 9, Prettier, Husky, lint-staged, commitlint

## Local development

Prerequisites: Node 20+ and pnpm 10+.

```bash
pnpm install
cp .env.example .env.local   # then fill in real values
pnpm dev                     # http://localhost:3000
```

Fonts: drop the Amazon Ember `.ttf` files into `public/fonts/` (see
`brand-assets/README.md`). Until then the site falls back to a system stack and
still builds and runs.

Seed sample data (needs a service account key, see Deployment):

```bash
pnpm seed
```

## Environment variables

See `.env.example`. Client values are public (`NEXT_PUBLIC_*`); admin values,
`RESEND_API_KEY`, and `TICKET_SECRET` are secret and must never be committed.

## Folder tour (`src/`)

- `app/` App Router routes. Route groups: `(marketing)` public site, `(auth)`
  sign-in, plus `console/` (member area) and `admin/` (admin area). `api/` holds
  route handlers.
- `components/` UI. `ui/` are shadcn primitives, `layout/` shells and nav,
  `cards/`, `feedback/`, `motion/`, `brand/`, `qr/`, `forms/`, `admin/`.
- `lib/` non-UI logic. `firebase/` SDK init, `firestore/` typed data helpers,
  `auth/` server and client auth, `email/`, `qr/`, `utils/`, `types/`,
  `constants/`.
- `middleware.ts` edge gate for `/console` and `/admin`.

## How to add a new page

1. Create `src/app/<group>/<route>/page.tsx`.
2. Export `metadata` (or `generateMetadata`) with a real title and description.
3. Prefer a Server Component. Read data through `lib/firestore/*` helpers, wrap
   non-critical reads in `safe()`, and add `export const dynamic = "force-dynamic"`
   if the page reads live data.
4. Add the route string to `lib/constants/routes.ts` and link via `routes.*`.

## How to add a new Firestore collection

1. Add the type in `lib/types/<name>.ts` and export it from `lib/types/index.ts`.
2. Add rules for the collection in `firestore.rules` (deny by default).
3. Add typed helpers in `lib/firestore/<name>.ts`: server reads use the Admin SDK
   (`server-only`), client writes use the client SDK (see `members.ts`).
4. Add any composite indexes to `firestore.indexes.json`.

## How to add a new admin CRUD

Copy `/admin/members`. It is the reference implementation:

- `src/app/admin/members/page.tsx` (list)
- `src/app/admin/members/new/page.tsx` (create)
- `src/app/admin/members/[id]/edit/page.tsx` (edit and delete)
- `src/lib/firestore/members.ts` (client writes) and `members.server.ts` (reads)
- `src/components/forms/MemberForm.tsx` (the form)

## Design system

Tokens live in `src/app/globals.css` under `@theme`. Colors: `ink`, `ink-soft`,
`ink-muted`, `paper`, `paper-warm`, `orange`, `blue`, `purple`, `magenta`,
`success`, `danger`, `warning`, plus shadcn semantic tokens. Fonts: `font-display`
(Amazon Ember Display), `font-mono` (Ember Mono), `font-duo` (Ember Duospace).
Sharp corners are on brand (`--radius: 0.25rem`). Motion respects
`prefers-reduced-motion` everywhere.

## Team ownership

| Area                                                                      | Owner     |
| ------------------------------------------------------------------------- | --------- |
| Landing, `/m/[username]`, brand, deployment                               | Vedant    |
| Events, event detail, admin events, check-in, registration + checkin APIs | Mohiuddin |
| Console, profile, my-events, settings, sign-in, middleware                | Jashwanth |
| Projects, project detail, admin projects                                  | Akshithi  |
| Members, team, about                                                      | Aarush    |
| Roadmap, admin roadmap, join                                              | Hanu      |
| Services, event ticket email, ticket QR, 404                              | Rishikesh |

## Contribution rules

- Branches: `feat/<owner>-<short>` and `fix/<owner>-<short>`. Never push to `main`.
- PRs use the template and need one approval plus green CI.
- Conventional Commits. No AI `Co-authored-by` lines.
- No em dashes. No fake numbers. No `console.log` (use the logger).
- See `CONTRIBUTING.md`.

## Deployment

1. Create a Firebase project. Enable Auth (Google), Firestore (production mode),
   and Storage.
2. Deploy security rules: `pnpm dlx firebase-tools deploy --only firestore:rules,storage`.
3. Create a service account key (Project settings > Service accounts). Save it as
   `secrets/service-account.json` (gitignored) for the seed script, and copy the
   project id, client email, and private key into the admin env vars.
4. Sign up for Resend; verify a domain, or use `onboarding@resend.dev` for dev.
5. Generate the ticket secret: `openssl rand -base64 32` into `TICKET_SECRET`.
6. On Vercel: import the repo, add all env vars from `.env.example`, deploy.
7. Run the seed locally against the dev Firebase project: `pnpm seed`.

## Roadmap (v2)

- CLI easter egg (backtick terminal)
- Certificate minting and verification
- Blog with an MDX pipeline
- Public `/status` uptime page
- Live telemetry (GitHub, Discord integrations)

## License

MIT. See [LICENSE](./LICENSE).

## Credits

Built by the AWS SBG VJIT team. Brand assets belong to AWS SBG and are used per
their guidelines.
