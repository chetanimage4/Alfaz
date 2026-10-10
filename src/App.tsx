import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from '@/components/ToastProvider';
import { FloatingNav } from '@/components/layout/FloatingNav';
import { Footer } from '@/components/layout/Footer';
import { SmokeClouds } from '@/components/SmokeClouds';
import { PageTransition } from '@/components/PageTransition';
import Home from '@/pages/Home';
import Shayaris from '@/pages/Shayaris';
import ShayariDetail from '@/pages/ShayariDetail';
import Stories from '@/pages/Stories';
import StoryDetail from '@/pages/StoryDetail';
import Khats from '@/pages/Khats';
import KhatDetail from '@/pages/KhatDetail';
import Books from '@/pages/Books';
import BookDetail from '@/pages/BookDetail';
import BookReader from '@/pages/BookReader';
import Thoughts from '@/pages/Thoughts';
import Admin from '@/pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <SmokeClouds />
        <FloatingNav />
        <div className="min-h-screen flex flex-col relative z-10">
          <main className="flex-1">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shayaris" element={<Shayaris />} />
                <Route path="/shayaris/:id" element={<ShayariDetail />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/stories/:id" element={<StoryDetail />} />
                <Route path="/khats" element={<Khats />} />
                <Route path="/khats/:id" element={<KhatDetail />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:id" element={<BookDetail />} />
                <Route path="/books/:id/read" element={<BookReader />} />
                <Route path="/thoughts" element={<Thoughts />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </PageTransition>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
