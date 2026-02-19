# `public.profiles`

> User profile data that extends `auth.users`. Auto-created on signup via a database trigger.

## Purpose

Stores user preferences and display information. Every authenticated user has exactly one profile row, automatically created when they sign up through the `on_auth_user_created` trigger.

---

## Schema

| Column         | Type          | Nullable | Default          | Description                                     |
|----------------|---------------|----------|------------------|-------------------------------------------------|
| `id`           | `uuid`        | NO       | —                | Primary key. References `auth.users(id)`.       |
| `display_name` | `text`        | YES      | `NULL`           | User's chosen display name.                     |
| `avatar_url`   | `text`        | YES      | `NULL`           | URL to the user's avatar image.                 |
| `timezone`     | `text`        | YES      | `'Asia/Bangkok'` | IANA timezone string for date/time display.     |
| `theme`        | `text`        | YES      | `'dark'`         | UI theme preference (`'dark'`, etc.).           |
| `created_at`   | `timestamptz` | YES      | `now()`          | When the profile was created.                   |
| `updated_at`   | `timestamptz` | YES      | `now()`          | When the profile was last updated.              |

## Primary Key

- `id` — also a **foreign key** to `auth.users(id)` with `ON DELETE CASCADE`.

## Indexes

- Primary key index on `id`.

---

## Row Level Security (RLS)

RLS is **enabled**. Three policies restrict access to the owning user only:

| Policy Name                   | Operation  | Rule                     |
|-------------------------------|------------|--------------------------|
| Users can view own profile    | `SELECT`   | `auth.uid() = id`        |
| Users can update own profile  | `UPDATE`   | `auth.uid() = id`        |
| Users can insert own profile  | `INSERT`   | `auth.uid() = id`        |

> **Note:** There is no `DELETE` policy — profiles are only removed when the linked `auth.users` row is deleted (cascade).

---

## Trigger: Auto-Create Profile

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (new.id, new.raw_user_meta_data->>'display_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

- **Trigger name:** `on_auth_user_created`
- **Fires:** `AFTER INSERT ON auth.users`
- **Behavior:** Inserts a new `profiles` row using the user's `id` and the `display_name` from `raw_user_meta_data`.

---

## Relationships

```
auth.users.id  ──(1:1)──►  profiles.id
```

- One-to-one with `auth.users`.
- Cascade delete: removing a user deletes their profile.

---

## Usage Notes

- The `timezone` field defaults to `'Asia/Bangkok'` — update this for users in other timezones.
- The `theme` field currently defaults to `'dark'`. The app should read this to apply the correct UI theme.
- `updated_at` is **not** auto-updated by a trigger — the application must set it explicitly on updates.

---

## Source

Defined in [`supabase/migrations/001_initial_schema.sql`](../../supabase/migrations/001_initial_schema.sql), lines 7–38.
