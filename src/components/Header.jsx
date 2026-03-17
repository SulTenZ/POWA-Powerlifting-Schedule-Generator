// src/components/Header.jsx
import React from 'react';
import { Dumbbell } from 'lucide-react';

export default function Header() {
  return (
    <div className="mb-16 animate-fade-in flex flex-col items-center justify-center text-center relative">
      {/* Intense localized glow behind the title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-24 bg-yellow-400/20 blur-[60px] rounded-full animate-glow pointer-events-none" />
      
      <div className="relative flex items-center gap-3 mb-2 p-2">
        <Dumbbell className="w-10 h-10 text-yellow-400" />
        <h1 className="text-6xl font-black text-white tracking-tighter leading-none">
          POWA
        </h1>
      </div>
      <p className="text-slate-400 font-medium tracking-tight relative z-10">Stronger every week.</p>
    </div>
  );
}