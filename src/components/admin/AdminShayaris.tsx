import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { fetchShayaris, createShayari, updateShayari, deleteShayari } from '@/lib/api';
import type { Shayari } from '@/types';
import { LoadingScreen } from '@/components/States';

export function AdminShayaris() {
  const [items, setItems] = useState<Shayari[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Shayari | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', author: '', category: '' });

  const load = async () => {
    try {
      const data = await fetchShayaris();
      setItems(data);
    } catch {
      // keep empty
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ title: '', content: '', author: '', category: '' });
    setShowForm(true);
  };

  const openEdit = (item: Shayari) => {
    setEditing(item);
    setForm({
      title: item.title || '',
      content: item.content,
      author: item.author || '',
      category: item.category || '',
    });
    setShowForm(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.content.trim()) return;
    try {
      if (editing) {
        await updateShayari(editing.id, {
          title: form.title || null,
          content: form.content,
          author: form.author || null,
          category: form.category || null,
        });
      } else {
        await createShayari({
          title: form.title || null,
          content: form.content,
          author: form.author || null,
          category: form.category || null,
        });
      }
      setShowForm(false);
      await load();
    } catch {
      // keep form open
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this shayari?')) return;
    try {
      await deleteShayari(id);
      await load();
    } catch {
      // ignore
    }
  };

  if (loading) return <LoadingScreen message="Loading shayaris..." />;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl text-amber-300 tracking-wide">
          Shayaris ({items.length})
        </h2>
        <button onClick={openNew} className="vintage-btn">
          <Plus className="w-4 h-4" /> New Shayari
        </button>
      </div>

      {showForm && (
        <form onSubmit={save} className="vintage-paper p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg text-stone-800 tracking-wide">
              {editing ? 'Edit Shayari' : 'New Shayari'}
            </h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-stone-500 hover:text-stone-800">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div>
            <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="vintage-input" />
          </div>
          <div>
            <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Content *</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="vintage-textarea" required rows={5} />
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
          <button type="submit" className="vintage-btn">
            <Save className="w-4 h-4" /> Save
          </button>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="vintage-paper p-4 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              {item.title && <h4 className="font-display text-base text-stone-800">{item.title}</h4>}
              <p className="font-body text-stone-600 italic line-clamp-2">{item.content}</p>
              <div className="flex gap-3 mt-1">
                {item.author && <span className="font-hand text-sm text-amber-700/60">{item.author}</span>}
                {item.category && <span className="font-hand text-sm text-amber-700/60">· {item.category}</span>}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(item)} className="p-2 text-amber-700 hover:bg-amber-700/10 transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => remove(item.id)} className="p-2 text-red-700 hover:bg-red-700/10 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="font-hand text-xl text-amber-200/40 text-center py-8">No shayaris yet.</p>
        )}
      </div>
    </div>
  );
}
