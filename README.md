# Campus Cycling Initiative

Three-page funnel website for a cycling initiative across IIM Calcutta, NIT Trichy, and BITS Pilani.

## Stack

| Layer    | Tech                              | Deploy     |
|----------|-----------------------------------|------------|
| Frontend | React 18 + Vite + Tailwind CSS    | Vercel     |
| Backend  | Express + Node.js                 | Railway    |
| Database | Supabase (PostgreSQL)             | Supabase   |

---

## 1. Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and paste + run `supabase/migrations/001_initial.sql`.
3. Copy your **Project URL** and **service_role key** (Settings → API).

---

## 2. Local development

### Backend

```bash
cd backend
cp .env.example .env        # fill in SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_PASSWORD
npm install
npm run dev                 # runs on :3001
```

### Frontend

```bash
cd frontend
cp .env.example .env        # leave VITE_API_URL blank for local dev
npm install
npm run dev                 # runs on :5173, proxies /api → :3001
```

Open http://localhost:5173. Admin dashboard is at http://localhost:5173/admin.

---

## 3. Deploy

### Backend → Railway

1. Push the repo to GitHub.
2. Create a new Railway project → **Deploy from GitHub repo** → select the `backend/` root directory.
3. Add environment variables in Railway (same as `.env.example`), plus `FRONTEND_URL=https://your-vercel-app.vercel.app`.
4. Railway auto-runs `npm start`.
5. Note your Railway public URL (e.g. `https://cycling-backend.railway.app`).

### Frontend → Vercel

1. Create a new Vercel project → import the same repo → set **Root Directory** to `frontend/`.
2. Add environment variable: `VITE_API_URL=https://cycling-backend.railway.app` (no trailing slash).
3. Vercel auto-runs `npm run build`. The `vercel.json` handles SPA routing.

---

## API reference

| Method | Path                    | Auth          | Description              |
|--------|-------------------------|---------------|--------------------------|
| POST   | /api/campus/view        | —             | Record a campus button click |
| POST   | /api/campus/interest    | —             | Record interested / not interested |
| POST   | /api/register           | —             | Save name + batch        |
| GET    | /api/admin/analytics    | Bearer token  | Analytics dashboard data |
| GET    | /health                 | —             | Health check             |

### Admin auth

Pass the `ADMIN_PASSWORD` as a Bearer token:
```
Authorization: Bearer <ADMIN_PASSWORD>
```

---

## User flow

```
Home (/)
  └─ click campus button → records view → /campus/:id
        ├─ Interested → records response → /register/:id
        │     └─ submit form → saves to DB → /success/:id
        └─ Not Interested → records response → back to /
```
