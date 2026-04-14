'use client';

import dynamic from 'next/dynamic';

const Background = dynamic(() => import('./Background3D'), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-white -z-10" />
});

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian to-obsidian" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(201, 162, 39, 0.03) 0%, transparent 50%)`,
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-sky-600/5 blur-3xl" />
    </div>
  );
}
