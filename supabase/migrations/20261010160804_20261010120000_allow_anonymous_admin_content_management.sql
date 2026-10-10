/*
# Remove authentication requirement from shared content management

1. Purpose
- This app no longer has a sign-in screen, so browser requests use the `anon` role.
- The admin page is intentionally a public/shared content editor as requested.

2. Security changes
- Keep row level security enabled on every content table.
- Replace authenticated-only write policies with policies for `anon, authenticated`.
- Preserve the existing shared-data rule: all visitors may manage the collection.

3. Affected tables
- `shayaris`, `stories`, `khats`, `books`, `book_pages`, and `thoughts`.
- No columns or stored content are removed or changed.
*/

DROP POLICY IF EXISTS "shayaris_insert" ON public.shayaris;
CREATE POLICY "shayaris_insert" ON public.shayaris FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "shayaris_update" ON public.shayaris;
CREATE POLICY "shayaris_update" ON public.shayaris FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "shayaris_delete" ON public.shayaris;
CREATE POLICY "shayaris_delete" ON public.shayaris FOR DELETE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "stories_insert" ON public.stories;
CREATE POLICY "stories_insert" ON public.stories FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "stories_update" ON public.stories;
CREATE POLICY "stories_update" ON public.stories FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "stories_delete" ON public.stories;
CREATE POLICY "stories_delete" ON public.stories FOR DELETE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "khats_insert" ON public.khats;
CREATE POLICY "khats_insert" ON public.khats FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "khats_update" ON public.khats;
CREATE POLICY "khats_update" ON public.khats FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "khats_delete" ON public.khats;
CREATE POLICY "khats_delete" ON public.khats FOR DELETE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "books_insert" ON public.books;
CREATE POLICY "books_insert" ON public.books FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "books_update" ON public.books;
CREATE POLICY "books_update" ON public.books FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "books_delete" ON public.books;
CREATE POLICY "books_delete" ON public.books FOR DELETE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "book_pages_insert" ON public.book_pages;
CREATE POLICY "book_pages_insert" ON public.book_pages FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "book_pages_update" ON public.book_pages;
CREATE POLICY "book_pages_update" ON public.book_pages FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "book_pages_delete" ON public.book_pages;
CREATE POLICY "book_pages_delete" ON public.book_pages FOR DELETE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "thoughts_insert" ON public.thoughts;
CREATE POLICY "thoughts_insert" ON public.thoughts FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "thoughts_update" ON public.thoughts;
CREATE POLICY "thoughts_update" ON public.thoughts FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "thoughts_delete" ON public.thoughts;
CREATE POLICY "thoughts_delete" ON public.thoughts FOR DELETE TO anon, authenticated USING (true);
