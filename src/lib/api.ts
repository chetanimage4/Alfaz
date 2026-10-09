import { supabase } from './supabase';
import type { Shayari, Story, Khat, Book, BookPage, Thought } from '@/types';

// ---- Shayaris ----
export async function fetchShayaris(): Promise<Shayari[]> {
  const { data, error } = await supabase
    .from('shayaris')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchShayari(id: string): Promise<Shayari | null> {
  const { data, error } = await supabase
    .from('shayaris')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function createShayari(item: Partial<Shayari>): Promise<Shayari> {
  const { data, error } = await supabase.from('shayaris').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateShayari(id: string, item: Partial<Shayari>): Promise<Shayari> {
  const { data, error } = await supabase.from('shayaris').update(item).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteShayari(id: string): Promise<void> {
  const { error } = await supabase.from('shayaris').delete().eq('id', id);
  if (error) throw error;
}

// ---- Stories ----
export async function fetchStories(): Promise<Story[]> {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchStory(id: string): Promise<Story | null> {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function createStory(item: Partial<Story>): Promise<Story> {
  const { data, error } = await supabase.from('stories').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateStory(id: string, item: Partial<Story>): Promise<Story> {
  const { data, error } = await supabase.from('stories').update(item).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteStory(id: string): Promise<void> {
  const { error } = await supabase.from('stories').delete().eq('id', id);
  if (error) throw error;
}

// ---- Khats ----
export async function fetchKhats(): Promise<Khat[]> {
  const { data, error } = await supabase
    .from('khats')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchKhat(id: string): Promise<Khat | null> {
  const { data, error } = await supabase
    .from('khats')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function createKhat(item: Partial<Khat>): Promise<Khat> {
  const { data, error } = await supabase.from('khats').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateKhat(id: string, item: Partial<Khat>): Promise<Khat> {
  const { data, error } = await supabase.from('khats').update(item).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteKhat(id: string): Promise<void> {
  const { error } = await supabase.from('khats').delete().eq('id', id);
  if (error) throw error;
}

// ---- Books ----
export async function fetchBooks(): Promise<Book[]> {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchBook(id: string): Promise<Book | null> {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function createBook(item: Partial<Book>): Promise<Book> {
  const { data, error } = await supabase.from('books').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateBook(id: string, item: Partial<Book>): Promise<Book> {
  const { data, error } = await supabase.from('books').update(item).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteBook(id: string): Promise<void> {
  const { error } = await supabase.from('books').delete().eq('id', id);
  if (error) throw error;
}

// ---- Book Pages ----
export async function fetchBookPages(bookId: string): Promise<BookPage[]> {
  const { data, error } = await supabase
    .from('book_pages')
    .select('*')
    .eq('book_id', bookId)
    .order('page_number', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createBookPage(item: Partial<BookPage>): Promise<BookPage> {
  const { data, error } = await supabase.from('book_pages').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateBookPage(id: string, item: Partial<BookPage>): Promise<BookPage> {
  const { data, error } = await supabase.from('book_pages').update(item).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteBookPage(id: string): Promise<void> {
  const { error } = await supabase.from('book_pages').delete().eq('id', id);
  if (error) throw error;
}

// ---- Thoughts ----
export async function fetchThoughts(): Promise<Thought[]> {
  const { data, error } = await supabase
    .from('thoughts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createThought(item: Partial<Thought>): Promise<Thought> {
  const { data, error } = await supabase.from('thoughts').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function deleteThought(id: string): Promise<void> {
  const { error } = await supabase.from('thoughts').delete().eq('id', id);
  if (error) throw error;
}
