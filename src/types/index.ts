export interface Shayari {
  id: string;
  title: string | null;
  content: string;
  author: string | null;
  category: string | null;
  created_at: string;
}

export interface Story {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  author: string | null;
  category: string | null;
  cover_url: string | null;
  created_at: string;
}

export interface Khat {
  id: string;
  title: string;
  content: string;
  author: string | null;
  recipient: string | null;
  created_at: string;
}

export interface Book {
  id: string;
  title: string;
  author: string | null;
  description: string | null;
  about: string | null;
  cover_url: string | null;
  genre: string | null;
  created_at: string;
}

export interface BookPage {
  id: string;
  book_id: string;
  chapter_title: string | null;
  page_number: number;
  content: string | null;
  image_url: string | null;
}

export interface Thought {
  id: string;
  content: string;
  author: string | null;
  created_at: string;
}
