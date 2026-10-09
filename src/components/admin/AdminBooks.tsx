import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, ChevronUp, ChevronDown, BookOpen, FileText, ArrowLeft } from 'lucide-react';
import {
  fetchBooks, createBook, updateBook, deleteBook,
  fetchBookPages, createBookPage, updateBookPage, deleteBookPage,
} from '@/lib/api';
import type { Book, BookPage } from '@/types';
import { LoadingScreen } from '@/components/States';
import { useToast } from '@/components/ToastProvider';

export function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Book | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [managingBook, setManagingBook] = useState<Book | null>(null);
  const [form, setForm] = useState({
    title: '', author: '', description: '', about: '', cover_url: '', genre: '',
  });
  const { toast } = useToast();

  const load = async () => {
    try { setBooks(await fetchBooks()); } catch { /* empty */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ title: '', author: '', description: '', about: '', cover_url: '', genre: '' });
    setShowForm(true);
  };

  const openEdit = (book: Book) => {
    setEditing(book);
    setForm({
      title: book.title, author: book.author || '', description: book.description || '',
      about: book.about || '', cover_url: book.cover_url || '', genre: book.genre || '',
    });
    setShowForm(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    try {
      const payload = {
        title: form.title, author: form.author || null, description: form.description || null,
        about: form.about || null, cover_url: form.cover_url || null, genre: form.genre || null,
      };
      if (editing) { await updateBook(editing.id, payload); toast('Book updated.', 'success'); }
      else { await createBook(payload); toast('Book created.', 'success'); }
      setShowForm(false); await load();
    } catch { toast('Could not save book.', 'error'); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this book and all its pages?')) return;
    try { await deleteBook(id); await load(); toast('Book deleted.', 'info'); } catch {
      toast('Could not delete book.', 'error');
    }
  };

  if (loading) return <LoadingScreen message="Loading books..." />;
  if (managingBook) return <BookPagesManager book={managingBook} onBack={() => setManagingBook(null)} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl text-amber-300 tracking-wide">Books ({books.length})</h2>
        <button onClick={openNew} className="vintage-btn"><Plus className="w-4 h-4" /> New Book</button>
      </div>

      {showForm && (
        <form onSubmit={save} className="vintage-paper p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg text-stone-800 tracking-wide">{editing ? 'Edit Book' : 'New Book'}</h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-stone-500 hover:text-stone-800"><X className="w-5 h-5" /></button>
          </div>
          <div>
            <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Title *</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="vintage-input" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Author</label>
              <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="vintage-input" />
            </div>
            <div>
              <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Genre</label>
              <input value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} className="vintage-input" />
            </div>
          </div>
          <div>
            <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Description</label>
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="vintage-input" placeholder="Short blurb for the library card" />
          </div>
          <div>
            <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">About</label>
            <textarea value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} className="vintage-textarea" rows={4} placeholder="Longer summary" />
          </div>
          <div>
            <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Cover URL</label>
            <input value={form.cover_url} onChange={(e) => setForm({ ...form, cover_url: e.target.value })} className="vintage-input" placeholder="https://..." />
          </div>
          <button type="submit" className="vintage-btn"><Save className="w-4 h-4" /> Save Book</button>
        </form>
      )}

      <div className="space-y-3">
        {books.map((book) => (
          <div key={book.id} className="vintage-paper p-4 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="font-display text-base text-stone-800">{book.title}</h4>
              {book.author && <span className="font-hand text-sm text-amber-700/60">by {book.author}</span>}
              {book.genre && <span className="font-hand text-sm text-amber-700/60"> · {book.genre}</span>}
              {book.description && <p className="font-body text-stone-600 italic line-clamp-1 mt-1">{book.description}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => setManagingBook(book)} className="p-2 text-amber-700 hover:bg-amber-700/10 transition-colors" title="Manage pages">
                <BookOpen className="w-4 h-4" />
              </button>
              <button onClick={() => openEdit(book)} className="p-2 text-amber-700 hover:bg-amber-700/10 transition-colors"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => remove(book.id)} className="p-2 text-red-700 hover:bg-red-700/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {books.length === 0 && <p className="font-hand text-xl text-amber-200/40 text-center py-8">No books yet.</p>}
      </div>
    </div>
  );
}

function BookPagesManager({ book, onBack }: { book: Book; onBack: () => void }) {
  const [pages, setPages] = useState<BookPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BookPage | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ chapter_title: '', page_number: 0, content: '', image_url: '' });
  const { toast } = useToast();

  const load = async () => {
    try { setPages(await fetchBookPages(book.id)); } catch { /* empty */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [book.id]);

  const openNew = () => {
    setEditing(null);
    setForm({ chapter_title: '', page_number: pages.length > 0 ? Math.max(...pages.map((p) => p.page_number)) + 1 : 1, content: '', image_url: '' });
    setShowForm(true);
  };

  const openEdit = (page: BookPage) => {
    setEditing(page);
    setForm({ chapter_title: page.chapter_title || '', page_number: page.page_number, content: page.content || '', image_url: page.image_url || '' });
    setShowForm(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { book_id: book.id, chapter_title: form.chapter_title || null, page_number: form.page_number, content: form.content || null, image_url: form.image_url || null };
      if (editing) { await updateBookPage(editing.id, payload); toast('Page updated.', 'success'); }
      else { await createBookPage(payload); toast('Page created.', 'success'); }
      setShowForm(false); await load();
    } catch { toast('Could not save page.', 'error'); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this page?')) return;
    try { await deleteBookPage(id); await load(); toast('Page deleted.', 'info'); } catch {
      toast('Could not delete page.', 'error');
    }
  };

  const movePage = async (page: BookPage, direction: 'up' | 'down') => {
    const sorted = [...pages].sort((a, b) => a.page_number - b.page_number);
    const idx = sorted.findIndex((p) => p.id === page.id);
    if (direction === 'up' && idx > 0) {
      const other = sorted[idx - 1];
      await Promise.all([
        updateBookPage(page.id, { page_number: other.page_number }),
        updateBookPage(other.id, { page_number: page.page_number }),
      ]);
    } else if (direction === 'down' && idx < sorted.length - 1) {
      const other = sorted[idx + 1];
      await Promise.all([
        updateBookPage(page.id, { page_number: other.page_number }),
        updateBookPage(other.id, { page_number: page.page_number }),
      ]);
    }
    await load();
  };

  if (loading) return <LoadingScreen message="Loading pages..." />;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="vintage-btn-outline"><ArrowLeft className="w-4 h-4" /> Books</button>
          <h2 className="font-display text-xl text-amber-300 tracking-wide">{book.title} — Pages ({pages.length})</h2>
        </div>
        <button onClick={openNew} className="vintage-btn"><Plus className="w-4 h-4" /> Add Page</button>
      </div>

      {showForm && (
        <form onSubmit={save} className="vintage-paper p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg text-stone-800 tracking-wide">{editing ? 'Edit Page' : 'New Page'}</h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-stone-500 hover:text-stone-800"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Chapter Title</label>
              <input value={form.chapter_title} onChange={(e) => setForm({ ...form, chapter_title: e.target.value })} className="vintage-input" placeholder="e.g. Chapter 1" />
            </div>
            <div>
              <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Page Number</label>
              <input type="number" value={form.page_number} onChange={(e) => setForm({ ...form, page_number: parseInt(e.target.value) || 0 })} className="vintage-input" />
            </div>
          </div>
          <div>
            <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Page Content</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="vintage-textarea" rows={6} />
          </div>
          <div>
            <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Image URL</label>
            <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="vintage-input" placeholder="https://..." />
          </div>
          <button type="submit" className="vintage-btn"><Save className="w-4 h-4" /> Save Page</button>
        </form>
      )}

      <div className="space-y-2">
        {[...pages].sort((a, b) => a.page_number - b.page_number).map((page, idx, arr) => (
          <div key={page.id} className="vintage-paper p-4 flex items-start gap-3">
            <div className="flex flex-col gap-1 flex-shrink-0">
              <button onClick={() => movePage(page, 'up')} disabled={idx === 0} className={`text-amber-700 ${idx === 0 ? 'opacity-30' : 'hover:bg-amber-700/10'} p-1 transition-colors`}>
                <ChevronUp className="w-4 h-4" />
              </button>
              <span className="font-display text-xs text-amber-700/60 text-center">{page.page_number}</span>
              <button onClick={() => movePage(page, 'down')} disabled={idx === arr.length - 1} className={`text-amber-700 ${idx === arr.length - 1 ? 'opacity-30' : 'hover:bg-amber-700/10'} p-1 transition-colors`}>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <FileText className="w-5 h-5 text-amber-700/50 flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              {page.chapter_title && <h4 className="font-display text-sm text-stone-800">{page.chapter_title}</h4>}
              <p className="font-body text-stone-600 italic line-clamp-2">{page.content || '(empty page)'}</p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => openEdit(page)} className="p-2 text-amber-700 hover:bg-amber-700/10 transition-colors"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => remove(page.id)} className="p-2 text-red-700 hover:bg-red-700/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {pages.length === 0 && <p className="font-hand text-xl text-amber-200/40 text-center py-8">No pages yet. Add the first page.</p>}
      </div>
    </div>
  );
}
