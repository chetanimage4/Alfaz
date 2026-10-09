/*
# Alfaz — Vintage Literary Website Schema

Creates the full data model for the Alfaz literary website: shayaris, stories, khats, books with page-by-page content, and shared thoughts.

## 1. New Tables

### shayaris
- `id` (uuid PK)
- `title` (text) — optional title for the shayari
- `content` (text, not null) — the shayari verses
- `author` (text) — poet/author name
- `category` (text) — e.g. love, loss, philosophy
- `created_at` (timestamptz)

### stories
- `id` (uuid PK)
- `title` (text, not null)
- `excerpt` (text) — short preview
- `content` (text, not null) — full story text
- `author` (text)
- `category` (text)
- `cover_url` (text) — optional image
- `created_at` (timestamptz)

### khats
- `id` (uuid PK)
- `title` (text, not null) — letter subject
- `content` (text, not null) — letter body
- `author` (text) — who wrote it
- `recipient` (text) — who it's addressed to
- `created_at` (timestamptz)

### books
- `id` (uuid PK)
- `title` (text, not null)
- `author` (text)
- `description` (text) — short blurb for the library card
- `about` (text) — longer about/summary
- `cover_url` (text) — book cover image URL
- `genre` (text)
- `created_at` (timestamptz)

### book_pages
- `id` (uuid PK)
- `book_id` (uuid FK → books, CASCADE)
- `chapter_title` (text)
- `page_number` (int) — ordering within the book
- `content` (text) — page text
- `image_url` (text) — optional page image

### thoughts
- `id` (uuid PK)
- `content` (text, not null)
- `author` (text) — optional name of submitter
- `created_at` (timestamptz)

## 2. Security
- RLS enabled on every table.
- This is a no-auth, single-tenant app — all CRUD is public via `TO anon, authenticated` with `USING (true)` / `WITH CHECK (true)`.
- The admin panel writes as anon; readers browse as anon.

## 3. Indexes
- `book_pages` indexed on `book_id` and `(book_id, page_number)` for efficient reader queries.
*/

CREATE TABLE IF NOT EXISTS shayaris (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  content text NOT NULL,
  author text,
  category text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE shayaris ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "shayaris_select" ON shayaris;
CREATE POLICY "shayaris_select" ON shayaris FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "shayaris_insert" ON shayaris;
CREATE POLICY "shayaris_insert" ON shayaris FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "shayaris_update" ON shayaris;
CREATE POLICY "shayaris_update" ON shayaris FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "shayaris_delete" ON shayaris;
CREATE POLICY "shayaris_delete" ON shayaris FOR DELETE
TO anon, authenticated USING (true);

-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text,
  content text NOT NULL,
  author text,
  category text,
  cover_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "stories_select" ON stories;
CREATE POLICY "stories_select" ON stories FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "stories_insert" ON stories;
CREATE POLICY "stories_insert" ON stories FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "stories_update" ON stories;
CREATE POLICY "stories_update" ON stories FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "stories_delete" ON stories;
CREATE POLICY "stories_delete" ON stories FOR DELETE
TO anon, authenticated USING (true);

-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS khats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author text,
  recipient text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE khats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "khats_select" ON khats;
CREATE POLICY "khats_select" ON khats FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "khats_insert" ON khats;
CREATE POLICY "khats_insert" ON khats FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "khats_update" ON khats;
CREATE POLICY "khats_update" ON khats FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "khats_delete" ON khats;
CREATE POLICY "khats_delete" ON khats FOR DELETE
TO anon, authenticated USING (true);

-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text,
  description text,
  about text,
  cover_url text,
  genre text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE books ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "books_select" ON books;
CREATE POLICY "books_select" ON books FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "books_insert" ON books;
CREATE POLICY "books_insert" ON books FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "books_update" ON books;
CREATE POLICY "books_update" ON books FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "books_delete" ON books;
CREATE POLICY "books_delete" ON books FOR DELETE
TO anon, authenticated USING (true);

-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS book_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  chapter_title text,
  page_number int NOT NULL DEFAULT 0,
  content text,
  image_url text
);

CREATE INDEX IF NOT EXISTS idx_book_pages_book_id ON book_pages(book_id);
CREATE INDEX IF NOT EXISTS idx_book_pages_order ON book_pages(book_id, page_number);

ALTER TABLE book_pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "book_pages_select" ON book_pages;
CREATE POLICY "book_pages_select" ON book_pages FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "book_pages_insert" ON book_pages;
CREATE POLICY "book_pages_insert" ON book_pages FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "book_pages_update" ON book_pages;
CREATE POLICY "book_pages_update" ON book_pages FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "book_pages_delete" ON book_pages;
CREATE POLICY "book_pages_delete" ON book_pages FOR DELETE
TO anon, authenticated USING (true);

-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS thoughts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  author text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE thoughts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "thoughts_select" ON thoughts;
CREATE POLICY "thoughts_select" ON thoughts FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "thoughts_insert" ON thoughts;
CREATE POLICY "thoughts_insert" ON thoughts FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "thoughts_update" ON thoughts;
CREATE POLICY "thoughts_update" ON thoughts FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "thoughts_delete" ON thoughts;
CREATE POLICY "thoughts_delete" ON thoughts FOR DELETE
TO anon, authenticated USING (true);
