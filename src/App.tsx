import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
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
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
