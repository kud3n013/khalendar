# Khalendar

A personal calendar, task management, and habit tracking web app.

## Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router) + TypeScript + [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend**: [Supabase](https://supabase.com/) (Auth, PostgreSQL, Row-Level Security)
- **Hosting**: [Vercel](https://vercel.com/) (client) + Supabase (server)

## Features

- 📅 **Calendar** — Day, 4-Day, Week, and Month views
- ✅ **Tasks** — Create, prioritize, and filter tasks
- ⏱️ **Time-Blocking** — Assign time blocks to tasks and view them on the calendar
- 🔁 **Habit Tracking** — Daily/weekly/custom habits with streak tracking
- 🔐 **Auth** — Email/password via Supabase Auth

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A [Supabase](https://supabase.com/) project

### Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/<your-username>/khalendar.git
   cd khalendar
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
   ```

4. **Set up the database:**

   Run the SQL migration in your Supabase SQL Editor:
   ```
   supabase/migrations/001_initial_schema.sql
   ```

5. **Start the dev server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/           # Login, Signup
│   ├── (dashboard)/      # Calendar, Tasks, Habits, Settings
│   ├── auth/callback/    # OAuth/email callback
│   └── api/              # Route Handlers
├── components/           # React components
│   ├── ui/               # Primitives (Button, Input, Dialog)
│   ├── calendar/         # Calendar views
│   ├── tasks/            # Task components
│   ├── habits/           # Habit components
│   └── layout/           # Sidebar, TopBar
├── hooks/                # Custom React hooks
├── lib/
│   ├── supabase/         # Supabase client setup
│   ├── types/            # TypeScript type definitions
│   └── utils.ts          # Helpers
└── styles/               # Global CSS
```

## License

Private — personal use only.
