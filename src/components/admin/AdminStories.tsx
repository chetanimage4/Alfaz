import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { fetchStories, createStory, updateStory, deleteStory } from '@/lib/api';
import type { Story } from '@/types';
import { LoadingScreen } from '@/components/States';
import { useToast } from '@/components/ToastProvider';

export function AdminStories() {
  const [items, setItems] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Story | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', author: '', category: '', cover_url: '' });
  const { toast } = useToast();

  const load = async () => {
    try { setItems(await fetchStories()); } catch { /* keep empty */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ title: '', excerpt: '', content: '', author: '', category: '', cover_url: '' });
    setShowForm(true);
  };

  const openEdit = (item: Story) => {
    setEditing(item);
    setForm({
      title: item.title, excerpt: item.excerpt || '', content: item.content,
      author: item.author || '', category: item.category || '', cover_url: item.cover_url || '',
    });
    setShowForm(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    try {
      const payload = {
        title: form.title, excerpt: form.excerpt || null, content: form.content,
        author: form.author || null, category: form.category || null, cover_url: form.cover_url || null,
      };
      if (editing) { await updateStory(editing.id, payload); toast('Story updated.', 'success'); }
      else { await createStory(payload); toast('Story created.', 'success'); }
      setShowForm(false); await load();
    } catch { toast('Could not save story.', 'error'); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this story?')) return;
    try { await deleteStory(id); await load(); toast('Story deleted.', 'info'); } catch {
      toast('Could not delete story.', 'error');
    }
  };

  if (loading) return <LoadingScreen message="Loading stories..." />;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl text-amber-300 tracking-wide">Stories ({items.length})</h2>
        <button onClick={openNew} className="vintage-btn"><Plus className="w-4 h-4" /> New Story</button>
      </div>

      {showForm && (
        <form onSubmit={save} className="vintage-paper p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg text-stone-800 tracking-wide">{editing ? 'Edit Story' : 'New Story'}</h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-stone-500 hover:text-stone-800"><X className="w-5 h-5" /></button>
          </div>
          <div>
            <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Title *</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="vintage-input" required />
          </div>
          <div>
            <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Excerpt</label>
            <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="vintage-input" />
          </div>
          <div>
            <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Content *</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="vintage-textarea" required rows={8} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Author</label>
              <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="vintage-input" />
            </div>
            <div>
              <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Category</label>
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="vintage-input" />
            </div>
          </div>
          <div>
            <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Cover URL</label>
            <input value={form.cover_url} onChange={(e) => setForm({ ...form, cover_url: e.target.value })} className="vintage-input" placeholder="https://..." />
          </div>
          <button type="submit" className="vintage-btn"><Save className="w-4 h-4" /> Save</button>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="vintage-paper p-4 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="font-display text-base text-stone-800">{item.title}</h4>
              <p className="font-body text-stone-600 italic line-clamp-2">{item.excerpt || item.content.substring(0, 100)}</p>
              <div className="flex gap-3 mt-1">
                {item.author && <span className="font-hand text-sm text-amber-700/60">{item.author}</span>}
                {item.category && <span className="font-hand text-sm text-amber-700/60">· {item.category}</span>}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(item)} className="p-2 text-amber-700 hover:bg-amber-700/10 transition-colors"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => remove(item.id)} className="p-2 text-red-700 hover:bg-red-700/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="font-hand text-xl text-amber-200/40 text-center py-8">No stories yet.</p>}
      </div>
    </div>
  );
}
