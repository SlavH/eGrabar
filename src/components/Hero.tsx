"use client";
import React from 'react';

export default function Hero({
  title,
  subtitle,
  action,
  className
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-12 ${className ?? ''}`}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">{title}</h2>
        {subtitle ? <p className="text-slate-600 text-lg md:text-xl">{subtitle}</p> : null}
        {action ? <div className="mt-6">{action}</div> : null}
      </div>
    </section>
  );
}
