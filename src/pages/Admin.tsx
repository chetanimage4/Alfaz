import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Feather, ScrollText, Mail, Library, PenTool, BookOpen, Lock, LogOut } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/components/ToastProvider';
import { AdminShayaris } from '@/components/admin/AdminShayaris';
import { AdminStories } from '@/components/admin/AdminStories';
import { AdminKhats } from '@/components/admin/AdminKhats';
import { AdminBooks } from '@/components/admin/AdminBooks';
import { AdminThoughts } from '@/components/admin/AdminThoughts';
import { OrnamentDark } from '@/components/vintage/Ornament';

type Tab = 'shayaris' | 'stories' | 'khats' | 'books' | 'thoughts';

const tabs: { key: Tab; label: string; icon: typeof Feather }[] = [
  { key: 'shayaris', label: 'Shayaris', icon: Feather },
  { key: 'stories', label: 'Stories', icon: ScrollText },
  { key: 'khats', label: 'Khats', icon: Mail },
  { key: 'books', label: 'Books', icon: Library },
  { key: 'thoughts', label: 'Thoughts', icon: PenTool },
];

export default function Admin() {
  const { isAdmin, loading, signIn, signOut } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>('shayaris');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSignInError('');
    const { error } = await signIn(email, password);
    if (error) {
      setSignInError(error);
      toast('Sign-in failed. Check your credentials.', 'error');
    } else {
      toast('Welcome back, keeper.', 'success');
    }
    setSubmitting(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast('Signed out successfully.', 'info');
  };

  if (loading) {
    return (
      <div className="min-h-screen vintage-wood-bg flex items-center justify-center">
        <BookOpen className="w-12 h-12 text-amber-500/60 animate-flicker" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen vintage-wood-bg py-16 px-4 md:px-8 relative flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="text-center mb-8 animate-text-blur-in">
            <Lock className="w-10 h-10 text-amber-500/70 mx-auto mb-4 animate-float" />
            <h1 className="font-display text-3xl md:text-4xl text-gold-gradient tracking-wider mb-2">
              Keeper's Quarters
            </h1>
            <p className="font-body text-amber-200/50 italic">
              Sign in to manage the collection
            </p>
            <OrnamentDark />
          </div>

          <form onSubmit={handleSignIn} className="vintage-paper p-8 space-y-4 animate-scale-in">
            <div>
              <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="vintage-input"
                placeholder="admin@alfaz.com"
                required
              />
            </div>
            <div>
              <label className="font-display text-xs tracking-wider uppercase text-amber-700/70 block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="vintage-input"
                placeholder="••••••••"
                required
              />
            </div>
            {signInError && (
              <p className="font-body text-red-800 text-sm italic">{signInError}</p>
            )}
            <button type="submit" disabled={submitting} className="vintage-btn w-full justify-center">
              <Lock className="w-4 h-4" />
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="vintage-btn-outline">
              <Feather className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen vintage-wood-bg py-16 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-text-blur-in">
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

        {/* Sign out */}
        <div className="mt-12 text-center">
          <button onClick={handleSignOut} className="vintage-btn-outline">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
