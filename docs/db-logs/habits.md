# `public.habits`

> Habit definitions with configurable frequency (daily, weekly, or custom days).

## Purpose

Stores the definition of habits a user wants to track. Each habit has a frequency setting and a target count. Actual completion tracking is stored in the related [`habit_logs`](./habit_logs.md) table.

---

## Schema

| Column         | Type          | Nullable | Default          | Description                                                          |
|----------------|---------------|----------|------------------|----------------------------------------------------------------------|
| `id`           | `uuid`        | NO       | `gen_random_uuid()` | Primary key. Auto-generated UUID.                                  |
| `user_id`      | `uuid`        | NO       | —                | Owner. References `auth.users(id)`.                                  |
| `title`        | `text`        | NO       | —                | Habit name (required).                                               |
| `description`  | `text`        | YES      | `NULL`           | Optional description / motivation.                                   |
| `color`        | `text`        | YES      | `'#10b981'` (green) | Hex color for UI rendering.                                       |
| `icon`         | `text`        | YES      | `NULL`           | Optional icon identifier (e.g. emoji or icon library key).          |
| `frequency`    | `text`        | YES      | `'daily'`        | How often. **Constrained** to: `'daily'`, `'weekly'`, `'custom'`.   |
| `custom_days`  | `integer[]`   | YES      | `NULL`           | Array of weekday numbers when `frequency = 'custom'`. See below.    |
| `target_count` | `integer`     | YES      | `1`              | How many times per period the habit should be completed.             |
| `created_at`   | `timestamptz` | YES      | `now()`          | Row creation timestamp.                                              |
| `updated_at`   | `timestamptz` | YES      | `now()`          | Row last-update timestamp.                                           |

## Primary Key

- `id` — auto-generated UUID.

## Foreign Keys

| Column    | References          | On Delete |
|-----------|---------------------|-----------|
| `user_id` | `auth.users(id)`    | CASCADE   |

## Check Constraints

| Column      | Allowed Values                         |
|-------------|----------------------------------------|
| `frequency` | `'daily'`, `'weekly'`, `'custom'`      |

---

## Row Level Security (RLS)

RLS is **enabled**. Four policies restrict full CRUD to the owning user:

| Policy Name                   | Operation  | Rule                          |
|-------------------------------|------------|-------------------------------|
| Users can view own habits     | `SELECT`   | `auth.uid() = user_id`        |
| Users can insert own habits   | `INSERT`   | `auth.uid() = user_id`        |
| Users can update own habits   | `UPDATE`   | `auth.uid() = user_id`        |
| Users can delete own habits   | `DELETE`   | `auth.uid() = user_id`        |

---

## Relationships

```
auth.users.id  ──(1:N)──►  habits.user_id
habits.id      ──(1:N)──►  habit_logs.habit_id
```

- One user can have many habits.
- Each habit can have many log entries (see [`habit_logs`](./habit_logs.md)).
- Cascade delete: removing a user deletes all their habits; removing a habit deletes its logs.

---

## Custom Days Format

When `frequency = 'custom'`, the `custom_days` column stores an **integer array** representing days of the week:

| Value | Day       |
|-------|-----------|
| `0`   | Sunday    |
| `1`   | Monday    |
| `2`   | Tuesday   |
| `3`   | Wednesday |
| `4`   | Thursday  |
| `5`   | Friday    |
| `6`   | Saturday  |

**Example:** A habit scheduled for Monday, Wednesday, and Friday: `{1, 3, 5}`

---

## Usage Notes

- **Default color:** `#10b981` is Tailwind CSS emerald-500 (green).
- **`target_count`** represents the number of completions needed per occurrence. For example, "Drink 8 glasses of water" → `target_count = 8`.
- The `icon` field is currently optional and can store emoji or an icon library identifier.
- `updated_at` is **not** auto-updated — the application must set it on each update.

---

## Source

Defined in [`supabase/migrations/001_initial_schema.sql`](../../supabase/migrations/001_initial_schema.sql), lines 101–124.
