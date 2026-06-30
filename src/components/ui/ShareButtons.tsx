'use client';

import { useState } from 'react';
import { useApp } from '@/lib/context';

function isMobileDevice() {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent);
}

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

  function toggleDropdown(open?: boolean) {
    setShowOptions(open !== undefined ? open : !showOptions);
  }

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
    {
      name: 'Messenger',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.975 12-11.111C24 4.975 18.627 0 12 0zm.72 14.963l-2.872-3.22-5.606 3.25 6.163-6.88 2.928 3.22 5.606-3.25-6.218 6.88z"/>
        </svg>
      ),
      href: `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=1224183197895298&redirect_uri=${encodedUrl}&display=popup`,
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: 'Viber',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.397 0c-.412.017-1.236.107-2.032.619C8.087 1.062 4.226 4.055 2.136 8.156c-1.555 3.054-1.421 5.646-.723 7.825.622 1.436.69 1.956.207 3.347-.484 1.39-3.072 5.513-1.858 6.964.942 1.295 3.2-.438 4.263-2.422.485-.941.707-1.36.905-1.557.273-.208.73-.306 1.177-.284.338.017 1.415.08 2.655.08 3.985 0 6.705-1.146 8.579-2.322 4.175-2.288 6.653-6.589 6.653-11.447C23.995 4.262 18.632 0 11.397 0zm.027 1.396c6.295 0 10.576 3.545 10.576 8.453 0 3.95-2.119 7.406-5.722 9.515-1.623.878-3.706 1.646-6.48 1.646-1.063 0-2.009-.046-2.736-.081-.673.6-1.688 1.756-3.068 2.868.034-1.36.045-2.32.045-3.013 0-.351-1.24-1.322-1.893-2.417-.966-1.622-1.304-5.484.678-8.576 1.935-3.013 5.302-5.18 7.97-6.256.523-.21 1.04-.287 1.63-.287v.148z"/>
          <path d="M12.185 5.345c-.285-.013-.472.07-.472.07s.19.07.466.098c.95.013 2.513.73 3.367 1.816.9 1.148 1.375 2.685 1.384 4.262.011-.71.072-1.155.072-1.155s.056-.453.034-1.116c-.066-3.135-2.416-5.003-4.851-4.976zm-1.068.854c-2.068.288-4.31 1.99-4.31 4.45 0 1.84 1.206 2.69 1.5 2.974.065.064.172.047.217-.032.075-.132.238-.43.31-.557.067-.12.041-.27-.053-.372-.084-.09-.383-.349-.383-1.14 0-1.154 1.079-2.63 2.626-2.63 1.488 0 2.443.923 2.443 2.15 0 1.48-.994 2.268-.994 2.795 0 .284.174.503.409.503.276 0 1.058-.544 1.36-.849.548-.552.94-1.393.94-2.541.003-2.19-1.621-4.165-4.158-4.165v-.013l.013.013zm-2.032 4.057c-.429.364-.762 1.681-.354 2.36.338.447.805.833 1.339 1.065.257.128.507.206.655.238.107.023.215-.037.25-.138.057-.165.173-.545.227-.714.045-.14-.005-.298-.124-.387-.104-.08-.395-.18-.637-.34-.375-.222-.63-.833-.63-1.195 0-.384.185-.656.296-.771.098-.101.112-.266.033-.39-.084-.132-.227-.14-.335-.138-.075.002-.524.01-.72.01-1.97 3.832-.027 0 0 0z"/>
        </svg>
      ),
      href: `viber://forward?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: 'Gmail',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.91 12 9.818l6.545-4.91 1.528-1.418C21.691 2.28 24 3.434 24 5.457z"/>
        </svg>
      ),
      href: `https://mail.google.com/mail/?view=cm&fs=1&su=${encodedTitle}&body=${encodedUrl}`,
    },
  ] as const;

  return (
    <div className="relative inline-flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={async () => {
          if (isMobileDevice() && typeof navigator !== 'undefined' && navigator.share) {
            try {
              await navigator.share({ title, url: shareUrl });
            } catch {
              toggleDropdown(true);
            }
          } else {
            toggleDropdown();
          }
        }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-blue-300 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        {t.common.share}
      </button>

      {showOptions && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => toggleDropdown(false)} />
          <div
            className="absolute left-0 top-full mt-2 z-[9999] flex flex-col bg-white/30 border border-white/20 rounded-xl p-1.5 shadow-xl min-w-[160px]"
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => toggleDropdown(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-blue-300 hover:bg-white/10 rounded-lg transition-colors"
                title={link.name}
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}
            <div className="border-t border-white/10 my-1" />
            <button
              onClick={() => { handleCopyLink(); toggleDropdown(false); }}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-blue-300 hover:bg-white/10 rounded-lg transition-colors"
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
              <span>{copied ? (language === 'en' ? 'Copied!' : 'Պատճենված') : (language === 'en' ? 'Copy link' : 'Պատճենի՛ր հղումը')}</span>
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
