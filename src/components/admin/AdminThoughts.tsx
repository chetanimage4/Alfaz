import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { fetchThoughts, deleteThought } from '@/lib/api';
import type { Thought } from '@/types';
import { LoadingScreen } from '@/components/States';

export function AdminThoughts() {
  const [items, setItems] = useState<Thought[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try { setItems(await fetchThoughts()); } catch { /* empty */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm('Delete this thought?')) return;
    try { await deleteThought(id); await load(); } catch { /* ignore */ }
  };

  if (loading) return <LoadingScreen message="Loading thoughts..." />;

  return (
    <div>
      <h2 className="font-display text-xl text-amber-300 tracking-wide mb-4">
        Submitted Thoughts ({items.length})
      </h2>
      <p className="font-body text-amber-200/40 italic mb-6">
        Thoughts are submitted by visitors from the Thoughts page. You can review and remove them here.
      </p>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="vintage-paper p-4 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-serif-vintage text-lg text-stone-700 italic">{item.content}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-hand text-base text-amber-700/60">— {item.author || 'Anonymous'}</span>
                <span className="font-body text-xs text-stone-500/50">
                  {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
            <button onClick={() => remove(item.id)} className="p-2 text-red-700 hover:bg-red-700/10 transition-colors flex-shrink-0">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="font-hand text-xl text-amber-200/40 text-center py-8">No thoughts submitted yet.</p>}
      </div>
    </div>
  );
}
