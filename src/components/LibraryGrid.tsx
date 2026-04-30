'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/types';
import { useApp } from '@/lib/context';
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardDescription } from '@/components/ui/glass-card';
import PdfCoverPreview from '@/components/ui/PdfCoverPreview';

interface LibraryGridProps {
  initialBooks?: Book[];
}

export default function LibraryGrid({ initialBooks = [] }: LibraryGridProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { t, language } = useApp();

  useEffect(() => {
    async function fetchBooks() {
      const { supabase } = await import('@/lib/supabase');
      setLoading(true);
      const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setBooks(data);
      }
      setLoading(false);
    }
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const title = language === 'en' ? book.title_en : book.title_hy;
    const author = language === 'en' ? book.author_en : book.author_hy;
    return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    author.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <a
            key={book.id}
            href={book.pdf_file || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <GlassCard className="card-hover">
              <PdfCoverPreview src={book.pdf_file || ''} className="aspect-[3/4]" />
              <GlassCardContent>
                <GlassCardTitle className="text-foreground group-hover:text-gold transition-colors">
                  {language === 'en' ? book.title_en : book.title_hy}
                </GlassCardTitle>
                <GlassCardDescription className="text-foreground/60">{language === 'en' ? book.author_en : book.author_hy}</GlassCardDescription>
              </GlassCardContent>
            </GlassCard>
          </a>
        ))}
      </div>
    </div>
  );
}
