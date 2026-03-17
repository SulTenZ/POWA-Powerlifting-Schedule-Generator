// src/components/OneRepMaxEstimator.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Copy, CheckCircle2 } from 'lucide-react';

export default function OneRepMaxEstimator() {
  const [isOpen, setIsOpen] = useState(false);
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [copied, setCopied] = useState(false);

  const calculate1RM = () => {
    const w = parseFloat(weight);
    const r = parseFloat(reps);
    if (w > 0 && r > 0) {
      if (r === 1) return w.toFixed(1);
      // Brzycki Formula: 1RM = Weight * (36 / (37 - Reps))
      // It is highly accurate for < 10 reps and matches StrengthLevel's default.
      return (w * (36 / (37 - r))).toFixed(1);
    }
    return '0.0';
  };

  const estimated1RM = calculate1RM();

  const handleCopy = () => {
    if (estimated1RM > 0) {
      navigator.clipboard.writeText(estimated1RM);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-6 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-600/50 shadow-lg"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-400/10 rounded-lg">
            <Calculator className="w-5 h-5 text-yellow-400" />
          </div>
          <span className="font-bold text-lg text-white">1RM Estimator</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-slate-700/30">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-wide text-slate-400 uppercase">Weight</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all placeholder:font-normal placeholder:text-slate-600"
                    placeholder="e.g. 100"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-wide text-slate-400 uppercase">Reps</label>
                  <input
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all placeholder:font-normal placeholder:text-slate-600"
                    placeholder="e.g. 5"
                    min="0"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-slate-800/40 rounded-xl p-4 border border-slate-700/30">
                <div>
                  <div className="text-xs font-bold tracking-wide text-slate-400 uppercase mb-1">Estimated 1RM</div>
                  <div className="text-3xl font-black text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]">
                    {estimated1RM}
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-colors focus:ring-2 focus:ring-yellow-400 focus:outline-none font-semibold"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="text-sm font-medium">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-3 text-center opacity-70">Using Brzycki Formula: W × (36 / (37 - R))</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
