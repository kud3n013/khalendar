# `public.habit_logs`

> Daily completion records for habits. Each row represents one day's progress on a specific habit.

## Purpose

Tracks when and how many times a habit was completed on a given day. Links to the parent [`habits`](./habits.md) table. The unique constraint on `(habit_id, logged_date)` ensures only one log entry per habit per day — repeated completions increment the `count`.

---

## Schema

| Column        | Type          | Nullable | Default             | Description                                               |
|---------------|---------------|----------|---------------------|-----------------------------------------------------------|
| `id`          | `uuid`        | NO       | `gen_random_uuid()`  | Primary key. Auto-generated UUID.                         |
| `habit_id`    | `uuid`        | NO       | —                   | The habit being logged. References `habits(id)`.          |
| `user_id`     | `uuid`        | NO       | —                   | Owner. References `auth.users(id)`.                       |
| `logged_date` | `date`        | NO       | —                   | The calendar date of completion.                          |
| `count`       | `integer`     | YES      | `1`                 | Number of completions on this date.                       |
| `created_at`  | `timestamptz` | YES      | `now()`             | Row creation timestamp.                                   |

## Primary Key

- `id` — auto-generated UUID.

## Foreign Keys

| Column     | References          | On Delete |
|------------|---------------------|-----------|
| `habit_id` | `habits(id)`        | CASCADE   |
| `user_id`  | `auth.users(id)`    | CASCADE   |

## Unique Constraints

| Columns                    | Purpose                                      |
|----------------------------|----------------------------------------------|
| `(habit_id, logged_date)`  | Prevent duplicate log entries per habit/day.  |

---

## Row Level Security (RLS)

RLS is **enabled**. Four policies restrict full CRUD to the owning user:

| Policy Name                       | Operation  | Rule                          |
|-----------------------------------|------------|-------------------------------|
| Users can view own habit logs     | `SELECT`   | `auth.uid() = user_id`        |
| Users can insert own habit logs   | `INSERT`   | `auth.uid() = user_id`        |
| Users can update own habit logs   | `UPDATE`   | `auth.uid() = user_id`        |
| Users can delete own habit logs   | `DELETE`   | `auth.uid() = user_id`        |

---

## Relationships

```
habits.id      ──(1:N)──►  habit_logs.habit_id
auth.users.id  ──(1:N)──►  habit_logs.user_id
```

- Each habit can have many log entries (one per day).
- Cascade delete on both FKs: deleting a habit or a user removes all associated logs.

---

## Usage Notes

- **Upsert pattern:** Because of the `UNIQUE(habit_id, logged_date)` constraint, use upsert (`ON CONFLICT ... DO UPDATE`) to increment `count` when a user logs the same habit multiple times in one day.
- **No `updated_at`:** This table does not have an `updated_at` column — logs are typically created or upserted, not manually edited.
- **Querying completion:** To check if a habit is "completed" for a day, compare `habit_logs.count >= habits.target_count`.
- **Date range queries:** Filter by `logged_date` for streak calculations, calendar heatmaps, and weekly/monthly summaries.

---

## Example Queries

### Check if a habit is completed today

```sql
SELECT hl.count >= h.target_count AS is_completed
FROM habit_logs hl
JOIN habits h ON h.id = hl.habit_id
WHERE hl.habit_id = '<habit_uuid>'
  AND hl.logged_date = CURRENT_DATE;
```

### Get all habit completions for a date range

```sql
SELECT hl.*, h.title, h.target_count
FROM habit_logs hl
JOIN habits h ON h.id = hl.habit_id
WHERE hl.user_id = '<user_uuid>'
  AND hl.logged_date BETWEEN '2026-02-01' AND '2026-02-28'
ORDER BY hl.logged_date;
```

---

## Source

Defined in [`supabase/migrations/001_initial_schema.sql`](../../supabase/migrations/001_initial_schema.sql), lines 129–148.
