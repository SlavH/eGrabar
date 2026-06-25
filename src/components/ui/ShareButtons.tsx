'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';

export default function ShareButtons({ title, url }: { title: string; url?: string }) {
  const [copied, setCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { t, language } = useApp();

  const shareUrl = (() => {
    if (!url) return typeof window !== 'undefined' ? window.location.href : '';
    if (url.startsWith('http')) return url;
    return typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;
  })();

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ] as const;

  useEffect(() => {
    if (!showOptions) return;
    function handleScroll() { setShowOptions(false); }
    window.addEventListener('scroll', handleScroll, { once: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showOptions]);

  return (
    <div className="relative inline-flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-blue-300 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        {t.common.share}
      </button>

      {showOptions && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowOptions(false)} />
          <div className="absolute left-0 top-full mt-2 z-50 flex gap-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-xl">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowOptions(false)}
                className="p-2 text-slate-300 hover:text-blue-300 hover:bg-white/10 rounded-lg transition-colors"
                title={link.name}
              >
                {link.icon}
              </a>
            ))}
            <button
              onClick={() => { handleCopyLink(); setShowOptions(false); }}
              className="p-2 text-slate-300 hover:text-blue-300 hover:bg-white/10 rounded-lg transition-colors"
              title={copied ? (language === 'en' ? 'Copied!' : 'Պատճենված') : (language === 'en' ? 'Copy link' : 'Պատճենել հղումը')}
            >
              {copied ? (
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }
}
