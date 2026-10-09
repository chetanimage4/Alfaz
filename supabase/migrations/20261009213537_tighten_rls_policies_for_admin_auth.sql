-- Tighten write access: only authenticated (admin) can modify content tables.
-- Public (anon) keeps read access to all content + can submit thoughts.

-- Shayaris: read for all, write for authenticated only
DROP POLICY IF EXISTS "shayaris_insert" ON shayaris;
DROP POLICY IF EXISTS "shayaris_update" ON shayaris;
DROP POLICY IF EXISTS "shayaris_delete" ON shayaris;

CREATE POLICY "shayaris_insert" ON shayaris FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "shayaris_update" ON shayaris FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "shayaris_delete" ON shayaris FOR DELETE
  TO authenticated USING (true);

-- Stories: read for all, write for authenticated only
DROP POLICY IF EXISTS "stories_insert" ON stories;
DROP POLICY IF EXISTS "stories_update" ON stories;
DROP POLICY IF EXISTS "stories_delete" ON stories;

CREATE POLICY "stories_insert" ON stories FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "stories_update" ON stories FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "stories_delete" ON stories FOR DELETE
  TO authenticated USING (true);

-- Khats: read for all, write for authenticated only
DROP POLICY IF EXISTS "khats_insert" ON khats;
DROP POLICY IF EXISTS "khats_update" ON khats;
DROP POLICY IF EXISTS "khats_delete" ON khats;

CREATE POLICY "khats_insert" ON khats FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "khats_update" ON khats FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "khats_delete" ON khats FOR DELETE
  TO authenticated USING (true);

-- Books: read for all, write for authenticated only
DROP POLICY IF EXISTS "books_insert" ON books;
DROP POLICY IF EXISTS "books_update" ON books;
DROP POLICY IF EXISTS "books_delete" ON books;

CREATE POLICY "books_insert" ON books FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "books_update" ON books FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "books_delete" ON books FOR DELETE
  TO authenticated USING (true);

-- Book pages: read for all, write for authenticated only
DROP POLICY IF EXISTS "book_pages_insert" ON book_pages;
DROP POLICY IF EXISTS "book_pages_update" ON book_pages;
DROP POLICY IF EXISTS "book_pages_delete" ON book_pages;

CREATE POLICY "book_pages_insert" ON book_pages FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "book_pages_update" ON book_pages FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "book_pages_delete" ON book_pages FOR DELETE
  TO authenticated USING (true);

-- Thoughts: read for all, insert for all (visitors share), delete for authenticated only
DROP POLICY IF EXISTS "thoughts_insert" ON thoughts;
DROP POLICY IF EXISTS "thoughts_update" ON thoughts;
DROP POLICY IF EXISTS "thoughts_delete" ON thoughts;

CREATE POLICY "thoughts_insert" ON thoughts FOR INSERT
  TO anon, authenticated WITH CHECK (true);
CREATE POLICY "thoughts_delete" ON thoughts FOR DELETE
  TO authenticated USING (true);
