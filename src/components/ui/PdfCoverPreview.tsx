'use client';

import { useEffect, useRef, useState } from 'react';

interface PdfCoverPreviewProps {
  src: string;
  className?: string;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

function needsProxy(url: string): boolean {
  if (!url) return false;
  if (!SUPABASE_URL) return false;
  return !url.startsWith(SUPABASE_URL);
}

export default function PdfCoverPreview({ src, className = '' }: PdfCoverPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) {
      setLoading(false);
      setError(true);
      return;
    }

    let cancelled = false;

    const renderCover = async () => {
      try {
        const rawUrl = typeof src === 'string' ? src : '';
        if (!rawUrl) throw new Error('Invalid PDF URL');

        const pdfUrl = needsProxy(rawUrl)
          ? `/api/pdf-proxy?url=${encodeURIComponent(rawUrl)}`
          : rawUrl;

        console.log('Attempting to load PDF from:', pdfUrl);

        const pdfjsLib = await import('pdfjs-dist');
        // Use a version of pdf.js worker that actually exists on cdnjs
        const version = '3.11.174'; 
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;
        
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/cmaps/`,
          cMapPacked: true,
        });


        loadingTask.onProgress = (progress) => {
            console.log('PDF load progress:', progress);
        };
        const pdf = await loadingTask.promise;
        console.log('PDF loaded, number of pages:', pdf.numPages);
        const page = await pdf.getPage(1);
        console.log('Page retrieved');
        
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        
          if (canvas && !cancelled) {
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            const context = canvas.getContext('2d');
            if (context) {
                // @ts-ignore
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                console.log('Rendering page...');
                // @ts-ignore
                await page.render(renderContext).promise;
                console.log('Page rendered successfully');
            }
          }
      } catch (err) {
        console.error('Failed to render PDF cover:', err);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    renderCover();
    return () => { cancelled = true; };
  }, [src]);

  if (error || !src) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center bg-zinc-900/50 text-gold ${className}`}>
        {error ? (
          <span className="text-xs text-center px-2">Preview unavailable</span>
        ) : (
          <span>Book</span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-zinc-900/50 ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-gold">
          <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
      />
    </div>
  );
}
