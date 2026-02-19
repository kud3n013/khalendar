# `public.events`

> Calendar events with time ranges, optional recurrence, and per-user isolation via RLS.

## Purpose

Stores all calendar events created by users. Supports all-day events, timed events, recurrence rules, and custom colors. Each event belongs to exactly one user.

---

## Schema

| Column            | Type          | Nullable | Default                    | Description                                                |
|-------------------|---------------|----------|----------------------------|------------------------------------------------------------|
| `id`              | `uuid`        | NO       | `gen_random_uuid()`        | Primary key. Auto-generated UUID.                          |
| `user_id`         | `uuid`        | NO       | —                          | Owner. References `auth.users(id)`.                        |
| `title`           | `text`        | NO       | —                          | Event title (required).                                    |
| `description`     | `text`        | YES      | `NULL`                     | Optional event description / notes.                        |
| `location`        | `text`        | YES      | `NULL`                     | Optional event location.                                   |
| `start_time`      | `timestamptz` | NO       | —                          | Start date/time of the event.                              |
| `end_time`        | `timestamptz` | NO       | —                          | End date/time of the event.                                |
| `all_day`         | `boolean`     | YES      | `false`                    | If `true`, the event spans entire day(s).                  |
| `color`           | `text`        | YES      | `'#3b82f6'` (Tailwind blue)| Hex color for rendering in the calendar UI.                |
| `recurrence_rule` | `text`        | YES      | `NULL`                     | iCal `RRULE` string for recurring events (e.g. `FREQ=WEEKLY;BYDAY=MO,WE,FR`). |
| `created_at`      | `timestamptz` | YES      | `now()`                    | Row creation timestamp.                                    |
| `updated_at`      | `timestamptz` | YES      | `now()`                    | Row last-update timestamp.                                 |

## Primary Key

- `id` — auto-generated UUID.

## Foreign Keys

| Column    | References          | On Delete |
|-----------|---------------------|-----------|
| `user_id` | `auth.users(id)`    | CASCADE   |

---

## Row Level Security (RLS)

RLS is **enabled**. Four policies restrict full CRUD to the owning user:

| Policy Name                   | Operation  | Rule                          |
|-------------------------------|------------|-------------------------------|
| Users can view own events     | `SELECT`   | `auth.uid() = user_id`        |
| Users can insert own events   | `INSERT`   | `auth.uid() = user_id`        |
| Users can update own events   | `UPDATE`   | `auth.uid() = user_id`        |
| Users can delete own events   | `DELETE`   | `auth.uid() = user_id`        |

---

## Relationships

```
auth.users.id  ──(1:N)──►  events.user_id
```

- One user can have many events.
- Cascade delete: removing a user deletes all their events.

---

## Usage Notes

- **Time handling:** Both `start_time` and `end_time` are `timestamptz`. The frontend should convert these using the user's `profiles.timezone`.
- **All-day events:** When `all_day = true`, `start_time` and `end_time` should represent the start and end of the day(s) in the user's timezone.
- **Recurrence:** The `recurrence_rule` column stores standard iCal RRULE strings. The application is responsible for expanding these into individual occurrences for display.
- **Default color:** `#3b82f6` is Tailwind CSS blue-500. Users can customize per-event.
- **`updated_at`** is not auto-updated — the app must set it on each update.

---

## Source

Defined in [`supabase/migrations/001_initial_schema.sql`](../../supabase/migrations/001_initial_schema.sql), lines 43–67.
