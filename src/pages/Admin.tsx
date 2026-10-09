import { useState } from 'react';
import { Settings, Feather, ScrollText, Mail, Library, PenTool, BookOpen } from 'lucide-react';
import { AdminShayaris } from '@/components/admin/AdminShayaris';
import { AdminStories } from '@/components/admin/AdminStories';
import { AdminKhats } from '@/components/admin/AdminKhats';
import { AdminBooks } from '@/components/admin/AdminBooks';
import { AdminThoughts } from '@/components/admin/AdminThoughts';

type Tab = 'shayaris' | 'stories' | 'khats' | 'books' | 'thoughts';

const tabs: { key: Tab; label: string; icon: typeof Feather }[] = [
  { key: 'shayaris', label: 'Shayaris', icon: Feather },
  { key: 'stories', label: 'Stories', icon: ScrollText },
  { key: 'khats', label: 'Khats', icon: Mail },
  { key: 'books', label: 'Books', icon: Library },
  { key: 'thoughts', label: 'Thoughts', icon: PenTool },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>('shayaris');

  return (
    <div className="min-h-screen vintage-wood-bg py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-amber-500 animate-flicker" />
            <h1 className="font-display text-4xl md:text-5xl text-gold-gradient tracking-wider">
              Admin Panel
            </h1>
          </div>
          <p className="font-body text-amber-200/50 italic text-lg">
            The keeper's quarters — manage the collection
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-1 justify-center mb-8 border-b border-amber-800/30 pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 font-display text-xs tracking-wider uppercase transition-all ${
                  activeTab === tab.key
                    ? 'text-amber-400 border-b-2 border-amber-500 -mb-2'
                    : 'text-amber-200/50 hover:text-amber-400 border-b-2 border-transparent -mb-2'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="animate-fade-in">
          {activeTab === 'shayaris' && <AdminShayaris />}
          {activeTab === 'stories' && <AdminStories />}
          {activeTab === 'khats' && <AdminKhats />}
          {activeTab === 'books' && <AdminBooks />}
          {activeTab === 'thoughts' && <AdminThoughts />}
        </div>
      </div>
    </div>
  );
}
