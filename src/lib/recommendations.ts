import { fetchShayaris, fetchStories, fetchKhats, fetchBooks } from '@/lib/api';
import type { Shayari, Story, Khat, Book } from '@/types';

export interface Recommendation {
  id: string;
  title: string;
  subtitle: string;
  link: string;
  tag: string;
}

export async function getRecommendations(
  type: 'shayari' | 'story' | 'khat' | 'book',
  currentId: string,
  category?: string | null,
  author?: string | null
): Promise<Recommendation[]> {
  const results: Recommendation[] = [];

  try {
    if (type === 'shayari') {
      const all = await fetchShayaris();
      const others = all.filter((s) => s.id !== currentId);
      const byCat = category ? others.filter((s) => s.category === category) : [];
      const byAuthor = author ? others.filter((s) => s.author === author && !byCat.includes(s)) : [];
      const pool = [...byCat, ...byAuthor];
      const remaining = others.filter((s) => !pool.includes(s));
      const picks = [...pool, ...remaining].slice(0, 3);
      picks.forEach((s: Shayari) => {
        results.push({
          id: s.id,
          title: s.title || s.content.split('\n')[0].slice(0, 40),
          subtitle: s.author || 'Unknown',
          link: `/shayaris/${s.id}`,
          tag: s.category || 'Shayari',
        });
      });
    } else if (type === 'story') {
      const all = await fetchStories();
      const others = all.filter((s) => s.id !== currentId);
      const byCat = category ? others.filter((s) => s.category === category) : [];
      const byAuthor = author ? others.filter((s) => s.author === author && !byCat.includes(s)) : [];
      const pool = [...byCat, ...byAuthor];
      const remaining = others.filter((s) => !pool.includes(s));
      const picks = [...pool, ...remaining].slice(0, 3);
      picks.forEach((s: Story) => {
        results.push({
          id: s.id,
          title: s.title,
          subtitle: s.author || 'Unknown',
          link: `/stories/${s.id}`,
          tag: s.category || 'Story',
        });
      });
    } else if (type === 'khat') {
      const all = await fetchKhats();
      const others = all.filter((k) => k.id !== currentId);
      const byAuthor = author ? others.filter((k) => k.author === author) : [];
      const remaining = others.filter((k) => !byAuthor.includes(k));
      const picks = [...byAuthor, ...remaining].slice(0, 3);
      picks.forEach((k: Khat) => {
        results.push({
          id: k.id,
          title: k.title,
          subtitle: k.author || 'Anonymous',
          link: `/khats/${k.id}`,
          tag: 'Khat',
        });
      });
    } else if (type === 'book') {
      const all = await fetchBooks();
      const others = all.filter((b) => b.id !== currentId);
      const byGenre = category ? others.filter((b) => b.genre === category) : [];
      const byAuthor = author ? others.filter((b) => b.author === author && !byGenre.includes(b)) : [];
      const pool = [...byGenre, ...byAuthor];
      const remaining = others.filter((b) => !pool.includes(b));
      const picks = [...pool, ...remaining].slice(0, 3);
      picks.forEach((b: Book) => {
        results.push({
          id: b.id,
          title: b.title,
          subtitle: b.author || 'Unknown',
          link: `/books/${b.id}`,
          tag: b.genre || 'Book',
        });
      });
    }
  } catch {
    // return empty on error
  }

  return results;
}
