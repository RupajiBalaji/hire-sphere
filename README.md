# HireSphere

**Skill. Prove. Hire.**

HireSphere is a task-based hiring platform built for freshers and students. Instead of submitting a traditional resume, candidates complete real work challenges posted by recruiters to prove their skills and get hired.

---

## What It Does

The platform has two distinct user roles:

**Candidates (Students / Freshers)**
- Browse skill challenges posted by real recruiters
- Submit solutions and track their progress
- Earn XP points, build a streak, and unlock verified skill badges
- Build a portfolio profile with experience, education, projects, and certifications
- Level up every 500 XP points (1 level = 500 pts)
- Earn a verified skill badge for every 5 completed tasks

**Recruiters (Companies)**
- Post real tasks from their company with skill requirements and deadlines
- Review candidate submissions and shortlist top talent
- Track active task performance on a recruiter dashboard

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) (SSR framework on TanStack Router + Vite) |
| Language | TypeScript 5.8 + React 19 |
| Routing | TanStack Router (file-based, auto-generated route tree) |
| Data fetching | TanStack Query v5 |
| Styling | Tailwind CSS v4 with custom OKLCH design tokens |
| UI components | shadcn/ui (New York style, full Radix UI set) |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Toasts | Sonner |
| Runtime | Bun (dev) / Node (production server) |
| Server | Nitro (via `@tanstack/react-start`) |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed, **or** Node.js with npm

### Install dependencies

```bash
bun install
# or
npm install
```

### Run the development server

```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
bun run build
```

### Preview the production build

```bash
bun run preview
```

### Start the production server

```bash
bun run start
# Runs: node dist/server/server.js
```

### Other scripts

```bash
bun run lint      # ESLint
bun run format    # Prettier
```

---

## Project Structure

```
src/
├── routes/                       # File-based routes (TanStack Router)
│   ├── __root.tsx                # Root layout, React Query provider, global SEO meta
│   ├── index.tsx                 # Splash / landing page (/)
│   ├── onboarding.tsx            # 3-step onboarding flow (/onboarding)
│   ├── role.tsx                  # Role selection — candidate or recruiter (/role)
│   ├── login.tsx                 # Candidate login (/login)
│   ├── signup.tsx                # Candidate signup (/signup)
│   ├── recruiter-login.tsx       # Recruiter login (/recruiter-login)
│   ├── recruiter-signup.tsx      # Recruiter signup (/recruiter-signup)
│   ├── app.tsx                   # Candidate app shell + bottom nav (/app)
│   ├── app.index.tsx             # Candidate home dashboard (/app/)
│   ├── app.tasks.index.tsx       # Task feed — browse & search (/app/tasks)
│   ├── app.tasks.$id.tsx         # Task detail + submission form (/app/tasks/:id)
│   ├── app.my-work.tsx           # Submissions tracker (/app/my-work)
│   ├── app.jobs.tsx              # Job listings (/app/jobs)
│   ├── app.profile.tsx           # Candidate profile view (/app/profile)
│   ├── app.edit-profile.tsx      # Edit candidate profile (/app/edit-profile)
│   ├── app.notifications.tsx     # Candidate inbox (/app/notifications)
│   ├── app.settings.tsx          # Settings + logout (/app/settings)
│   ├── recruiter.tsx             # Recruiter app shell + bottom nav (/recruiter)
│   ├── recruiter.index.tsx       # Recruiter dashboard (/recruiter/)
│   ├── recruiter.create.tsx      # Post a new task (/recruiter/create)
│   ├── recruiter.review.tsx      # Review candidate submissions (/recruiter/review)
│   ├── recruiter.profile.tsx     # Recruiter profile view (/recruiter/profile)
│   ├── recruiter.edit-profile.tsx# Edit recruiter profile
│   ├── recruiter.notifications.tsx
│   └── recruiter.settings.tsx
│
├── components/
│   ├── MobileShell.tsx           # 440px centered mobile container + ScreenHeader
│   ├── BottomNav.tsx             # Candidate bottom navigation bar
│   ├── TaskCard.tsx              # Reusable task card (also defines the Task type)
│   ├── ProgressCard.tsx          # XP progress bar widget
│   ├── QuickStats.tsx            # Stats row — tasks, skills, streak, points
│   ├── FeaturedTasks.tsx         # Skill-matched recommended tasks
│   ├── DailyChallenge.tsx        # Daily challenge prompt card
│   ├── SuggestedSkills.tsx       # Skill suggestions derived from task feed
│   ├── RecentActivity.tsx        # Activity feed
│   ├── RecruiterOpportunities.tsx# Recruiter company cards
│   ├── Logo.tsx
│   └── ui/                       # Full shadcn/ui component library
│
├── lib/
│   ├── api/
│   │   ├── auth.ts               # login / signup / logout — localStorage
│   │   ├── tasks.ts              # Tasks CRUD + submission tracking — localStorage
│   │   ├── profile.ts            # Candidate & recruiter profile CRUD — localStorage
│   │   └── userStats.ts          # XP, streak, level calculation — localStorage
│   ├── mock-data.ts              # Seed task data
│   └── utils.ts                  # cn() Tailwind merge utility
│
├── hooks/
│   └── use-mobile.tsx            # useIsMobile hook
│
├── router.tsx                    # QueryClient + router setup
├── server.ts                     # SSR / edge server entry
├── start.ts                      # TanStack Start middleware
└── styles.css                    # Tailwind v4 config + custom design tokens
```

---

## Pages & Navigation

### Candidate app (`/app/*`)

| Route | Page |
|---|---|
| `/app/` | Home dashboard — progress card, stats, daily challenge, featured tasks |
| `/app/tasks` | Browse and search all available tasks |
| `/app/tasks/:id` | Task detail with description, skills, deadline, and submission form |
| `/app/my-work` | Track submitted and completed tasks |
| `/app/jobs` | Job listings posted by recruiters |
| `/app/profile` | View candidate profile |
| `/app/edit-profile` | Edit name, bio, skills, experience, education, projects, certifications |
| `/app/notifications` | Inbox / notifications |
| `/app/settings` | App settings and logout |

### Recruiter portal (`/recruiter/*`)

| Route | Page |
|---|---|
| `/recruiter/` | Dashboard — metrics (tasks posted, candidates, pending reviews) |
| `/recruiter/create` | Post a new task with live card preview |
| `/recruiter/review` | Review submissions, shortlist candidates |
| `/recruiter/profile` | Recruiter company profile |
| `/recruiter/settings` | Settings and logout |

---

## Data Storage

This project has **no backend or database**. All data is persisted in the browser's `localStorage` under these keys:

| Key | Contents |
|---|---|
| `hiresphere_user` | Logged-in user (email, name, role) |
| `hiresphere_tasks` | All posted tasks |
| `hiresphere_submissions` | Candidate task submissions |
| `hiresphere_full_profile` | Candidate profile |
| `hiresphere_recruiter_profile` | Recruiter profile |
| `hiresphere_user_stats` | XP points, streak days, tasks completed |

All API functions (`src/lib/api/*`) are async wrappers over `localStorage`, consumed via TanStack Query for client-side caching.

> Clearing browser storage will reset all data.

---

## Design System

- **Mobile-first** — all pages are capped at 440px width, centered in the viewport to mimic a native mobile app.
- **Color system** — built with CSS custom properties using `oklch()` colors. Light and dark modes are supported.
- **Custom gradients** — `bg-gradient-primary`, `bg-gradient-hero`, `bg-gradient-soft` defined as Tailwind utilities.
- **Custom shadows** — `shadow-card`, `shadow-elevated`, `shadow-glow`.
- **Typography** — Poppins and Plus Jakarta Sans for headings, Inter and DM Sans for body text (loaded from Google Fonts).
- **Component library** — shadcn/ui "New York" style with path aliases configured in `components.json`.

---

## Gamification

Candidates are rewarded as they complete tasks:

- **+100 XP** per completed task submission
- **Level up** every 500 XP (Level = `floor(totalXP / 500) + 1`)
- **Streak** — increments on consecutive daily activity; resets if a day is missed
- **Verified Skills** — one badge earned for every 5 tasks completed

---

## Key Dependencies

```json
"@tanstack/react-router": "^1.168.25",
"@tanstack/react-query": "^5.83.0",
"@tanstack/react-start": "^1.167.50",
"react": "^19.2.0",
"tailwindcss": "^4.2.1",
"zod": "^3.24.2",
"react-hook-form": "^7.71.2",
"recharts": "^2.15.4",
"lucide-react": "^0.575.0",
"sonner": "^2.0.7"
```

Full dependency list is in [`package.json`](./package.json).

---

## License

Private repository — not licensed for public distribution.
"# hire-sphere" 
