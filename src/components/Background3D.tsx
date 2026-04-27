'use client';

import dynamic from 'next/dynamic';

const Background = dynamic(() => import('./Background3D'), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-slate-950 -z-10" />
});

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: 'url(/background.jpeg)' }}
      />
    </div>
  );
}
