'use client';

import { useState, useEffect } from 'react';
import { Video } from '@/types';
import { useApp } from '@/lib/context';
import Hero from '@/components/Hero';
import ShareButtons from '@/components/ui/ShareButtons';

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, language, getLocalizedText } = useApp();

  useEffect(() => {
    async function fetchVideos() {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0) {
        setVideos(data);
      }
      setLoading(false);
    }
    fetchVideos();
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 bg-background">
      <Hero
        title={t.nav.videos}
        subtitle={t.sections.videoHubDesc}
        className="mb-8"
      />
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-50 rounded-xl h-72 animate-pulse" />
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-50 flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">{t.common.noVideosYet}</h3>
            <p className="text-slate-500">{t.common.noVideosHint}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="group bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 card-hover max-w-full">
                <div className="relative aspect-video bg-black rounded-t-xl overflow-hidden">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtube_url?.includes('v=') ? video.youtube_url.split('v=')[1].split('&')[0] : video.youtube_url?.split('/').pop()}`}
                    title={getLocalizedText(video, 'title')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-100 line-clamp-2 mb-2 group-hover:text-blue-300 transition-colors">{getLocalizedText(video, 'title')}</h3>
                  <div className="flex justify-end">
                    <ShareButtons title={getLocalizedText(video, 'title')} url={`/videos#${video.id}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
