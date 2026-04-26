'use client';

import { useState, useEffect } from 'react';
import { Video } from '@/types';
import { useApp } from '@/lib/context';
import Hero from '@/components/Hero';

const mockVideos: Video[] = [
  { id: '1', title: 'Ancient Armenian Astronomy', description: 'A detailed look at historical star charts.', thumbnail_url: '', video_url: '', youtube_id: '123', duration: 1800, created_at: new Date().toISOString(), views: 100 },
  { id: '2', title: 'Architecture of Khachkars', description: 'Understanding the geometry of stone cross-stones.', thumbnail_url: '', video_url: '', youtube_id: '456', duration: 2400, created_at: new Date().toISOString(), views: 250 },
];

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useApp();

  useEffect(() => {
    async function fetchVideos() {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0) {
        setVideos(data);
      } else {
        setVideos(mockVideos);
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
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">{t.nav.videos}</h1>
          <p className="text-slate-600 text-lg max-w-2xl">{t.sections.videoHubDesc}</p>
        </div>

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
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No videos yet</h3>
            <p className="text-slate-500">Check back soon for educational content</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="group bg-slate-50 rounded-xl overflow-hidden border border-slate-200 card-hover">
                <div className="relative aspect-video bg-white">
                  {video.thumbnail_url ? (
                    <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600/90 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">{video.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
