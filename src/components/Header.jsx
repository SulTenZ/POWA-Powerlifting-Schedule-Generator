// src/components/Header.jsx
import React from 'react';
import { Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header({ unit, onUnitToggle }) {
  const isLbs = unit === 'lbs';

  return (
    <div className="mb-12 animate-fade-in flex flex-col items-center justify-center text-center relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-24 bg-yellow-400/20 blur-[60px] rounded-full animate-glow pointer-events-none" />
      
      <div className="relative flex items-center gap-3 mb-2 p-2">
        <Dumbbell className="w-10 h-10 text-yellow-400" />
        <h1 className="text-6xl font-black text-white tracking-tighter leading-none">
          POWA
        </h1>
      </div>
      <p className="text-slate-400 font-medium tracking-tight relative z-10 mb-8">Stronger every week.</p>

      {/* Modern Toggle Switch */}
      <div className="relative z-10 flex items-center gap-4 bg-slate-900/60 p-1.5 rounded-full border border-slate-700/50 backdrop-blur-md">
        <button
          onClick={() => onUnitToggle('kg')}
          className={`relative px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-colors z-10 ${
            !isLbs ? 'text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          KG
          {!isLbs && (
            <motion.div
              layoutId="activeUnit"
              className="absolute inset-0 bg-yellow-400 rounded-full -z-10 shadow-[0_0_12px_rgba(250,204,21,0.4)]"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
        <button
          onClick={() => onUnitToggle('lbs')}
          className={`relative px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-colors z-10 ${
            isLbs ? 'text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          LBS
          {isLbs && (
            <motion.div
              layoutId="activeUnit"
              className="absolute inset-0 bg-yellow-400 rounded-full -z-10 shadow-[0_0_12px_rgba(250,204,21,0.4)]"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      </div>
    </div>
  );
}