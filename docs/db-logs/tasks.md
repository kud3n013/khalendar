# `public.tasks`

> User tasks with status tracking, priority levels, due dates, and time-blocking support.

## Purpose

Stores user tasks (to-dos) with workflow status, priority, and optional time-blocking fields. Tasks can be scheduled onto specific dates and time ranges for time-block-based planning in the calendar view.

---

## Schema

| Column             | Type          | Nullable | Default                    | Description                                                        |
|--------------------|---------------|----------|----------------------------|--------------------------------------------------------------------|
| `id`               | `uuid`        | NO       | `gen_random_uuid()`        | Primary key. Auto-generated UUID.                                  |
| `user_id`          | `uuid`        | NO       | —                          | Owner. References `auth.users(id)`.                                |
| `title`            | `text`        | NO       | —                          | Task title (required).                                             |
| `description`      | `text`        | YES      | `NULL`                     | Optional description / details.                                    |
| `status`           | `text`        | YES      | `'todo'`                   | Workflow status. **Constrained** to: `'todo'`, `'in_progress'`, `'done'`. |
| `priority`         | `text`        | YES      | `'medium'`                 | Priority level. **Constrained** to: `'low'`, `'medium'`, `'high'`, `'urgent'`. |
| `due_date`         | `date`        | YES      | `NULL`                     | Optional deadline date.                                            |
| `block_date`       | `date`        | YES      | `NULL`                     | The date this task is time-blocked onto the calendar.              |
| `block_start_time` | `time`        | YES      | `NULL`                     | Start time of the time block (e.g. `09:00:00`).                    |
| `block_end_time`   | `time`        | YES      | `NULL`                     | End time of the time block (e.g. `11:00:00`).                      |
| `created_at`       | `timestamptz` | YES      | `now()`                    | Row creation timestamp.                                            |
| `updated_at`       | `timestamptz` | YES      | `now()`                    | Row last-update timestamp.                                         |

## Primary Key

- `id` — auto-generated UUID.

## Foreign Keys

| Column    | References          | On Delete |
|-----------|---------------------|-----------|
| `user_id` | `auth.users(id)`    | CASCADE   |

## Check Constraints

| Column     | Allowed Values                              |
|------------|---------------------------------------------|
| `status`   | `'todo'`, `'in_progress'`, `'done'`         |
| `priority` | `'low'`, `'medium'`, `'high'`, `'urgent'`   |

---

## Row Level Security (RLS)

RLS is **enabled**. Four policies restrict full CRUD to the owning user:

| Policy Name                  | Operation  | Rule                          |
|------------------------------|------------|-------------------------------|
| Users can view own tasks     | `SELECT`   | `auth.uid() = user_id`        |
| Users can insert own tasks   | `INSERT`   | `auth.uid() = user_id`        |
| Users can update own tasks   | `UPDATE`   | `auth.uid() = user_id`        |
| Users can delete own tasks   | `DELETE`   | `auth.uid() = user_id`        |

---

## Relationships

```
auth.users.id  ──(1:N)──►  tasks.user_id
```

- One user can have many tasks.
- Cascade delete: removing a user deletes all their tasks.

---

## Time-Blocking

The `block_date`, `block_start_time`, and `block_end_time` columns enable **time-blocking** — assigning a task to a specific calendar slot:

- When all three fields are set, the task appears as a block on the calendar view.
- `block_date` is a `date` (no timezone) — it represents the calendar day.
- `block_start_time` and `block_end_time` are `time` (no timezone) — they represent wall-clock times.
- Tasks with overlapping blocks are rendered in side-by-side columns in the UI (see `WeekView` / `DayView` components).

> **Important:** `due_date` and `block_date` serve different purposes. `due_date` is the deadline; `block_date` is when the user plans to work on the task.

---

## Usage Notes

- Marking a task as `'done'` applies a strikethrough + grayscale style in the UI.
- The `priority` field can be used for sorting and color-coding tasks.
- `updated_at` is **not** auto-updated — the application must set it on each update.

---

## Source

Defined in [`supabase/migrations/001_initial_schema.sql`](../../supabase/migrations/001_initial_schema.sql), lines 72–96.
