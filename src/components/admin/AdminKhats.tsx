import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { fetchKhats, createKhat, updateKhat, deleteKhat } from '@/lib/api';
import type { Khat } from '@/types';
import { LoadingScreen } from '@/components/States';

export function AdminKhats() {
  const [items, setItems] = useState<Khat[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Khat | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', author: '', recipient: '' });

  const load = async () => {
    try { setItems(await fetchKhats()); } catch { /* empty */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm({ title: '', content: '', author: '', recipient: '' }); setShowForm(true); };
  const openEdit = (item: Khat) => {
    setEditing(item);
    setForm({ title: item.title, content: item.content, author: item.author || '', recipient: item.recipient || '' });
    setShowForm(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    try {
      const payload = { title: form.title, content: form.content, author: form.author || null, recipient: form.recipient || null };
      if (editing) await updateKhat(editing.id, payload); else await createKhat(payload);
      setShowForm(false); await load();
    } catch { /* keep */ }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this khat?')) return;
    try { await deleteKhat(id); await load(); } catch { /* ignore */ }
  };

  if (loading) return <LoadingScreen message="Loading khats..." />;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl text-amber-300 tracking-wide">Khats ({items.length})</h2>
        <button onClick={openNew} className="vintage-btn"><Plus className="w-4 h-4" /> New Khat</button>
      </div>

      {showForm && (
        <form onSubmit={save} className="vintage-paper p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg text-stone-800 tracking-wide">{editing ? 'Edit Khat' : 'New Khat'}</h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-stone-500 hover:text-stone-800"><X className="w-5 h-5" /></button>
          </div>
          <div>
            <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Title *</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="vintage-input" required />
          </div>
          <div>
            <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">Content *</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="vintage-textarea" required rows={6} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">From (Author)</label>
              <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="vintage-input" />
            </div>
            <div>
              <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-1">To (Recipient)</label>
              <input value={form.recipient} onChange={(e) => setForm({ ...form, recipient: e.target.value })} className="vintage-input" />
            </div>
          </div>
          <button type="submit" className="vintage-btn"><Save className="w-4 h-4" /> Save</button>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="vintage-paper p-4 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="font-display text-base text-stone-800">{item.title}</h4>
              <p className="font-body text-stone-600 italic line-clamp-2">{item.content}</p>
              <div className="flex gap-3 mt-1">
                {item.author && <span className="font-hand text-sm text-amber-700/60">From: {item.author}</span>}
                {item.recipient && <span className="font-hand text-sm text-amber-700/60">To: {item.recipient}</span>}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(item)} className="p-2 text-amber-700 hover:bg-amber-700/10 transition-colors"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => remove(item.id)} className="p-2 text-red-700 hover:bg-red-700/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="font-hand text-xl text-amber-200/40 text-center py-8">No khats yet.</p>}
      </div>
    </div>
  );
}
