'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/types';
import { useApp } from '@/lib/context';
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardDescription } from '@/components/ui/glass-card';

interface LibraryGridProps {
  initialBooks?: Book[];
}

const categories = [
  { key: 'all', hy: 'Բոլորը', en: 'All' },
  { key: 'science', hy: 'Գիտություն', en: 'Science' },
  { key: 'religion', hy: 'Կրոն', en: 'Religion' },
  { key: 'culture', hy: 'Մշակույթ', en: 'Culture' },
  { key: 'art', hy: 'Արվեստ', en: 'Art' },
];

export default function LibraryGrid({ initialBooks = [] }: LibraryGridProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const { t, language } = useApp();

  const mockBooks: Book[] = [
    { id: '2', title: 'Astrophysics in Ancient Armenia', author: 'Prof. A. Sargsyan', description: 'Evidence of stellar observation.', category: 'science', cover_url: '', pdf_url: '', created_at: new Date().toISOString(), views: 25 },
  ];

  useEffect(() => {
    async function fetchBooks() {
      const { supabase } = await import('@/lib/supabase');
      setLoading(true);
      let query = supabase.from('books').select('*').order('created_at', { ascending: false });
      
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }
      
      const { data, error } = await query;
      
      if (!error && data && data.length > 0) {
        setBooks(data);
      } else {
        setBooks(mockBooks);
      }
      setLoading(false);
    }
    fetchBooks();
  }, [selectedCategory]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryLabel = (key: string) => {
    const cat = categories.find(c => c.key === key);
    return cat ? cat[language] : key;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={t.library.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-4 py-3 bg-card-bg border border-border rounded-xl text-foreground placeholder-zinc-500 focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.key
                  ? 'bg-gold text-white'
                  : 'bg-card-bg text-foreground hover:text-gold border border-border'
              }`}
            >
              {cat[language]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <GlassCard key={book.id} className="card-hover">
            <div className="relative aspect-[3/4] bg-zinc-900/50">
               {/* Simplified cover placeholder for now */}
               <div className="w-full h-full flex items-center justify-center text-gold">Book Cover</div>
            </div>
            <GlassCardContent>
              <span className="inline-block px-2 py-0.5 text-xs font-medium text-gold bg-gold/10 rounded mb-2">
                {getCategoryLabel(book.category)}
              </span>
              <GlassCardTitle className="text-foreground group-hover:text-gold transition-colors">
                {book.title}
              </GlassCardTitle>
              <GlassCardDescription className="text-foreground/60">{book.author}</GlassCardDescription>
            </GlassCardContent>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
