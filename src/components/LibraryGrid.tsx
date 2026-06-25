'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/types';
import { useApp } from '@/lib/context';
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardDescription } from '@/components/ui/glass-card';
import PdfCoverPreview from '@/components/ui/PdfCoverPreview';
import ShareButtons from '@/components/ui/ShareButtons';

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
            className="w-full pl-4 pr-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all"
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
            className="block h-full"
              onClick={(e) => {
                if (!book.pdf_file || book.pdf_file === '' || book.pdf_file === '#') {
                  e.preventDefault();
                  alert('PDF not available');
                }
              }}
          >
            <GlassCard className="card-hover max-w-full">
              <PdfCoverPreview src={book.pdf_file || ''} coverUrl={book.cover_url || ''} className="aspect-[3/4]" />
              <GlassCardContent>
                <GlassCardTitle className="text-slate-100 group-hover:text-blue-300 transition-colors break-words">
                  {language === 'en' ? book.title_en : book.title_hy}
                </GlassCardTitle>
                <GlassCardDescription className="text-slate-300/80 break-words">{language === 'en' ? book.author_en : book.author_hy}</GlassCardDescription>
                <div className="flex justify-end mt-3">
                  <ShareButtons title={language === 'en' ? book.title_en : book.title_hy} url={`/library#${book.id}`} />
                </div>
              </GlassCardContent>
            </GlassCard>
          </a>
        ))}
      </div>
    </div>
  );
}
