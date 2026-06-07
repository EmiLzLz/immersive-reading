# FOLIO

**Your personal immersive reading space.**

[Live Demo](https://folio-ir-delta.vercel.app)

---

## What is FOLIO?

FOLIO is a web app that lets you upload any PDF and read it the way you want — choosing your font, size, and reading width. Authenticated users get a personal library where their documents are saved and accessible across sessions. Unauthenticated users can still upload and read without an account; the document simply lives in their session.

The goal was to build a real, functional product while learning Next.js 15 App Router patterns from the ground up — auth, server actions, middleware, RLS, and deployment included.

---

## Features

- Upload any PDF and read it with a clean, distraction-free reader
- Adjust font (serif / sans-serif), font size, and reading width
- Create an account to save documents to a personal library
- Access your library and pick up where you left off
- Works without an account — no friction to start reading
- Conditional UI based on auth state throughout the app

---

## Stack

- **Next.js 15** — App Router, Server Components, Server Actions, Route Handlers
- **TypeScript**
- **Tailwind CSS v4** — utility classes + custom CSS tokens in `globals.css`
- **Supabase** — auth (email/password) and Postgres database with Row Level Security
- **@supabase/ssr** — session management via cookies for SSR compatibility
- **Sonner** — toast notifications
- **Lucide React** — icons
- **pdfjs-dist** — PDF parsing in the browser

---

## Architecture decisions

**Two Supabase clients** — `createClientSS()` for Server Components and Server Actions (reads session from cookies), `createClientCS()` for Client Components. Mixing them causes session loss or RLS bypasses.

**Server Actions for auth** — `signUp`, `signIn`, and `signOut` live in `app/actions/auth.ts`. No API routes needed. `signOut` redirects to `/?logged_out=true` so the client can show a toast after the server redirect.

**Conditional Header as Server Component** — reads session server-side with `getUser()` (not `getSession()`, which is unsafe on the server). Renders Login/Register or Logout/Library links accordingly.

**Split flow for authenticated vs unauthenticated upload** — authenticated users have their document saved to Supabase with their `user_id` and are redirected to `/library`. Unauthenticated users have their document stored in `sessionStorage` and are redirected to `/read`, a lightweight client page that renders the same reader without persistence.

**Row Level Security** — the `documents` table enforces that users can only insert and select their own documents via `auth.uid() = user_id` policies.

---

## Project structure

```
app/
├── _components/        # Shared components (Header, LogoutToast)
├── actions/            # Server Actions (auth, uploadDocument)
├── auth/confirm/       # Route Handler for email confirmation
├── document/[id]/      # Reading view for saved documents
├── library/            # Personal document library (protected)
├── login/              # Login page
├── read/               # Reading view for unauthenticated sessions
├── register/           # Register page
lib/
├── supabase/
│   ├── server.ts       # createClientSS
│   └── client.ts       # createClientCS
middleware.ts           # Session refresh + route protection
```

---

## Local development

Requires a Supabase project with a `documents` table and RLS enabled. Copy `.env.local.example` to `.env.local` and fill in your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

```bash
npm install
npm run dev
```