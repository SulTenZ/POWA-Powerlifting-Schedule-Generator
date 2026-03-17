// src/components/LoadingSpinner.jsx
import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="text-center py-24 animate-fade-in delay-150">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-slate-800 border-t-yellow-400 mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]"></div>
      <p className="text-slate-400 text-sm tracking-wide uppercase font-semibold">
        Generating schedule
      </p>
    </div>
  );
}