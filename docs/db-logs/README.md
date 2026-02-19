# Khalendar — Database Schema Reference

> Documentation for all `public.*` tables on the remote Supabase server.
>
> **Source of truth:** [`supabase/migrations/001_initial_schema.sql`](../../supabase/migrations/001_initial_schema.sql)

---

## Tables

| Table                              | Purpose                                               |
|------------------------------------|-------------------------------------------------------|
| [`profiles`](./profiles.md)        | User preferences & display info (extends `auth.users`) |
| [`events`](./events.md)            | Calendar events with time ranges & recurrence          |
| [`tasks`](./tasks.md)              | To-do items with priority, status & time-blocking      |
| [`habits`](./habits.md)            | Habit definitions with frequency settings              |
| [`habit_logs`](./habit_logs.md)    | Daily habit completion records                         |

## Functions & Triggers

| Name                   | Type      | Description                                                |
|------------------------|-----------|------------------------------------------------------------|
| `handle_new_user()`    | Function  | Auto-creates a `profiles` row when a new user signs up.    |
| `on_auth_user_created` | Trigger   | Fires `handle_new_user()` after insert on `auth.users`.    |

## Entity Relationships

```
auth.users
  ├──(1:1)──► profiles
  ├──(1:N)──► events
  ├──(1:N)──► tasks
  ├──(1:N)──► habits
  │              └──(1:N)──► habit_logs
  └──(1:N)──► habit_logs
```

## Common Patterns

- **RLS:** All tables have Row Level Security enabled. Every policy filters on `auth.uid() = user_id` (or `= id` for `profiles`).
- **Cascade deletes:** All foreign keys use `ON DELETE CASCADE`.
- **Timestamps:** `created_at` defaults to `now()`. `updated_at` exists on most tables but must be set manually by the application.
- **UUIDs:** All primary keys are UUIDs (either from `auth.users` or `gen_random_uuid()`).

---

*Last updated: 2026-02-19*
