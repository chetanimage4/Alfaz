# ALFAZ — Vintage Literary Website

A beautifully crafted vintage-themed literary website featuring shayaris (poetry), stories, unsent letters (khats), a book library with page-by-page reading, and a community thoughts wall. Built with React, TypeScript, Vite, and Supabase.

## Features

- **Shayaris** — Browse poetry by category, read individual verses on elegant paper-textured cards
- **Stories** — Read short stories with excerpts, author info, and category stamps
- **Unsent Khats** — Letters that were folded but never delivered, presented as envelopes with wax seals
- **Book Library** — A collection of books with cover art, descriptions, table of contents, and a page-by-page reader with keyboard navigation
- **Thoughts Wall** — Visitors can share their own reflections; admin can moderate
- **Admin Panel** — Password-protected management for all content (shayaris, stories, khats, books + pages, thoughts)
- **Recommendations** — Related content suggestions on every detail page
- **Vintage Design** — Floating navigation, drifting smoke effects, scroll-triggered animations, torn-paper cards, curtain transitions, and toast notifications

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, custom vintage CSS |
| Icons | lucide-react |
| Routing | react-router-dom |
| Database & Auth | Supabase (PostgreSQL) |

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase project (or alternative PostgreSQL database — see migration guide below)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These are pre-populated if the project was created on Bolt.

### Running the Dev Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Type Checking

```bash
npm run typecheck
```

## Admin Access

The admin panel at `/admin` requires authentication.

- **Email:** `admin@alfaz.com`
- **Password:** `alfaz2026`

**To change the admin password**, run this SQL in your Supabase SQL Editor:

```sql
UPDATE auth.users
SET encrypted_password = crypt('your_new_password', gen_salt('bf'))
WHERE email = 'admin@alfaz.com';
```

## Database Schema

The app uses 6 tables:

| Table | Purpose |
|-------|---------|
| `shayaris` | Poetry entries (title, content, author, category) |
| `stories` | Short stories (title, excerpt, content, author, category, cover image) |
| `khats` | Unsent letters (title, content, author, recipient) |
| `books` | Book metadata (title, author, description, about, cover, genre) |
| `book_pages` | Individual pages within books (chapter title, page number, content, image) |
| `thoughts` | Visitor-submitted reflections (content, author) |

### Security Model

- **Public (anonymous) users** can read all content and submit thoughts
- **Authenticated (admin) users** can create, update, and delete all content
- Row Level Security (RLS) is enabled on every table
- The `thoughts` table allows public inserts (so visitors can share) but only admin can delete

Migration files are in `supabase/migrations/`.

## Project Structure

```
src/
  components/
    admin/           — Admin CRUD panels for each content type
    layout/          — FloatingNav, Footer
    vintage/         — Reusable vintage UI elements (Ornament, WaxSeal, Ribbon, Stamp, etc.)
    AuthProvider.tsx — Supabase auth context
    ToastProvider.tsx — Toast notification system
    Recommendations.tsx — "You May Also Like" component
    SmokeClouds.tsx  — Ambient background animation
    States.tsx       — Loading, error, empty state components
    PageTransition.tsx — Route transition curtain effect
  hooks/
    useScrollReveal.ts — Intersection Observer hook for scroll animations
  lib/
    api.ts           — All Supabase database queries
    supabase.ts      — Supabase client initialization
    recommendations.ts — Related content recommendation engine
  pages/
    Home.tsx         — Landing page with hero, featured shayari, collection cards
    Shayaris.tsx     — Shayari listing with category filters
    ShayariDetail.tsx — Individual shayari with recommendations
    Stories.tsx      — Story listing
    StoryDetail.tsx  — Individual story with recommendations
    Khats.tsx        — Letter listing
    KhatDetail.tsx   — Individual letter with recommendations
    Books.tsx        — Book library grid
    BookDetail.tsx   — Book info + table of contents + recommendations
    BookReader.tsx   — Page-by-page reader with keyboard navigation
    Thoughts.tsx     — Submit form + shared reflections wall
    Admin.tsx        — Login screen + tabbed admin dashboard
  types/
    index.ts         — TypeScript interfaces for all database models
```

---

## Migrating from Supabase to Neon DB

Neon is a serverless PostgreSQL provider. Since Supabase is built on PostgreSQL, migrating is straightforward — the schema SQL is standard Postgres. However, Supabase-specific features (Auth, RLS policies, the `anon`/`authenticated` roles) need adaptation.

### Step 1: Create a Neon Project

1. Go to [neon.tech](https://neon.tech) and sign up / log in
2. Create a new project
3. Choose a region close to your users
4. Copy the **connection string** — it looks like:
   ```
   postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

### Step 2: Export Your Data from Supabase

You need both the schema (table definitions) and the data (rows).

**Option A — Using Supabase Dashboard (easiest for small datasets):**

1. Go to your Supabase Dashboard → SQL Editor
2. Run this to get your schema:
   ```sql
   -- Get all table definitions
   SELECT pg_get_tabledef('public.' || tablename) FROM pg_tables WHERE schemaname = 'public';
   ```
   Or simply use the migration files in `supabase/migrations/` — they contain all `CREATE TABLE` statements.

3. Go to Table Editor → select each table → click "Export to CSV"

**Option B — Using pg_dump (best for complete export):**

```bash
# Use your Supabase database URL (find it in Project Settings → Database)
# Format: postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres

pg_dump "postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres" \
  --no-owner \
  --no-privileges \
  --schema=public \
  --data-only \
  --column-inserts \
  -f supabase_data.sql

pg_dump "postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres" \
  --no-owner \
  --no-privileges \
  --schema=public \
  --schema-only \
  -f supabase_schema.sql
```

### Step 3: Import into Neon

**Import the schema:**

```bash
psql "postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require" \
  -f supabase_schema.sql
```

Or manually run the table creation SQL (from `supabase/migrations/20261003132455_create_alfaz_tables.sql`), skipping the RLS policy statements.

**Import the data:**

```bash
psql "postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require" \
  -f supabase_data.sql
```

Or import CSV files:

```sql
-- In Neon SQL Editor or psql:
COPY shayaris FROM '/path/to/shayaris.csv' WITH (FORMAT csv, HEADER true);
COPY stories FROM '/path/to/stories.csv' WITH (FORMAT csv, HEADER true);
COPY khats FROM '/path/to/khats.csv' WITH (FORMAT csv, HEADER true);
COPY books FROM '/path/to/books.csv' WITH (FORMAT csv, HEADER true);
COPY book_pages FROM '/path/to/book_pages.csv' WITH (FORMAT csv, HEADER true);
COPY thoughts FROM '/path/to/thoughts.csv' WITH (FORMAT csv, HEADER true);
```

### Step 4: What Doesn't Transfer Automatically

Supabase provides features that Neon (plain Postgres) does not have built-in. You'll need replacements:

| Supabase Feature | Neon Replacement |
|-----------------|-----------------|
| **Auth** (email/password login) | Use a third-party auth provider (Clerk, Auth0, NextAuth) or build your own with bcrypt + JWT |
| **RLS Policies** | Neon supports RLS but you need to set up roles manually. Without Supabase's `anon`/`authenticated` roles, you'll need to create custom roles or handle authorization in your application code |
| **Auto-generated REST API** | Build your own API layer (e.g., with Express, Hono, or a serverless function) or use a tool like PostgREST |
| **Realtime subscriptions** | Not available on Neon directly — use a websocket layer or polling |
| **Storage (file uploads)** | Use S3, Cloudinary, or similar |

### Step 5: Update the Application Code

The app currently talks to Supabase through the client SDK. To switch to Neon, you have two options:

**Option A — Use Neon with a server-side API (recommended):**

1. Install the `pg` package (or `@neondatabase/serverless` for edge/serverless):

   ```bash
   npm install @neondatabase/serverless
   ```

2. Create a new API client that replaces `src/lib/supabase.ts` and `src/lib/api.ts`:

   ```typescript
   // src/lib/db.ts
   import { neon } from '@neondatabase/serverless';

   const sql = neon(import.meta.env.VITE_NEON_DATABASE_URL);

   // Example query:
   export async function fetchShayaris() {
     return await sql`SELECT * FROM shayaris ORDER BY created_at DESC`;
   }
   ```

   **Important:** Direct database connections from the browser are insecure. For production, put your Neon connection behind a serverless function (Vercel, Cloudflare Workers, etc.) and call that from your frontend.

3. Update all functions in `src/lib/api.ts` to use the new query layer instead of the Supabase client.

4. Replace `src/components/AuthProvider.tsx` with your new auth solution (Clerk, Auth0, or custom JWT-based auth).

5. Update `.env`:

   ```env
   # Remove these:
   # VITE_SUPABASE_URL=...
   # VITE_SUPABASE_ANON_KEY=...

   # Add these:
   VITE_NEON_DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
   VITE_API_BASE_URL=https://your-api-endpoint.com  # if using a serverless API
   ```

**Option B — Use Neon's Postgres with Supabase SDK (partial compatibility):**

You can keep the Supabase JS client but point it at your Neon database. This only works for database queries — Auth, Storage, and Realtime won't work:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://your-neon-proxy-url.com',  // needs a PostgREST proxy
  'your-anon-key'
);
```

This requires running PostgREST in front of your Neon database, which adds complexity. Option A is cleaner.

### Step 6: Set Up Admin Auth Without Supabase

Since you're losing Supabase Auth, create a simple admin login:

1. Create an `admins` table in Neon:

   ```sql
   CREATE TABLE admins (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     email text UNIQUE NOT NULL,
     password_hash text NOT NULL  -- bcrypt hash
   );
   ```

2. Insert an admin user:

   ```bash
   # Generate a bcrypt hash (requires Node)
   node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your_password', 10))"
   ```

   ```sql
   INSERT INTO admins (email, password_hash)
   VALUES ('admin@alfaz.com', '$2a$10$your_generated_hash_here');
   ```

3. Update `AuthProvider.tsx` to verify credentials against this table via your API, then issue a JWT or session token.

### Step 7: Test Everything

1. Verify all pages load and display data from Neon
2. Test the admin login flow
3. Test CRUD operations (create, edit, delete) for each content type
4. Test the thoughts submission form
5. Test the book reader page navigation

### Quick Reference: Schema-Only Migration SQL for Neon

If you just want the tables without Supabase-specific RLS policies, run this in Neon's SQL Editor:

```sql
CREATE TABLE shayaris (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  content text NOT NULL,
  author text,
  category text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text,
  content text NOT NULL,
  author text,
  category text,
  cover_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE khats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author text,
  recipient text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text,
  description text,
  about text,
  cover_url text,
  genre text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE book_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  chapter_title text,
  page_number int NOT NULL DEFAULT 0,
  content text,
  image_url text
);

CREATE INDEX idx_book_pages_book_id ON book_pages(book_id);
CREATE INDEX idx_book_pages_order ON book_pages(book_id, page_number);

CREATE TABLE thoughts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  author text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL
);
```

## License

This project is created for personal use. Feel free to customize it for your own literary collection.
