# Algero Frontend

React + Vite + Tailwind CSS frontend for the Algero platform. Includes both the **public site** and the **admin panel**.

## Requirements

- Node.js 18+ (recommended)
- npm (or yarn/pnpm)

## Setup

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

- **Public site:** http://localhost:5173
- **Admin panel:** http://localhost:5173/admin/login

## Build (production)

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Scripts

- `npm run dev` - start dev server
- `npm run build` - build for production
- `npm run preview` - preview production build

## Project structure

```
src/
  app/              Public pages (home, about, blog, projects, services, team, contact)
  features/
    admin/          Admin panel
      components/   AdminLayout, ProtectedRoute, ImageUpload
      contexts/     AuthContext (JWT auth)
      pages/        Dashboard, Blogs, Team, Services, Projects, Subscribers, Leads, Approvals, Users
  components/       Shared UI components (Navbar, Footer, background effects)
  lib/              API client, env config
  hooks/            Custom React hooks
  types/            TypeScript types
```

## Admin panel

The admin panel at `/admin` provides:

- **Dashboard** with content stats
- **CRUD** for blogs, team members, services, projects
- **Subscribers** and **contact leads** views
- **Super-admin:** approvals workflow and user management
- **Image upload** with drag-and-drop

Authentication uses JWT bearer tokens stored in localStorage.

## Docker

```bash
# From repo root
docker compose up --build
```

The frontend is served via Nginx which also proxies `/api/*` and `/uploads/*` to the FastAPI backend.

## Notes

- This project uses Vite + React + Tailwind CSS.
- API requests are configured via `VITE_API_URL` env variable (defaults to `http://localhost:8000`).
