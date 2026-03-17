// src/components/ScheduleTable.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { calculatePlates } from '../utils/calculations';

export default function ScheduleTable({ liftData, liftName, unit = 'kg' }) {
  const isLbs = unit === 'lbs';
  const barWeight = isLbs ? 45 : 20;

  return (
    <div className="mb-8">
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-black text-yellow-500 mb-8 uppercase tracking-widest border-l-4 border-yellow-500 pl-4 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]"
      >
        {liftName}
      </motion.h3>
      
      <div className="space-y-6">
        {liftData.map((week, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            key={week.week} 
            className="bg-slate-900/40 p-6 rounded-3xl border border-slate-700/30 shadow-[0_4px_20px_0_rgba(0,0,0,0.2)] backdrop-blur-sm"
          >
            <h4 className="text-sm font-black tracking-widest text-slate-400 uppercase mb-4 pl-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              Week {week.week}
            </h4>
            
            <div className="grid grid-cols-1 gap-3">
              {week.sets.map((set, setIdx) => {
                const plates = calculatePlates(set.weight, barWeight);

                return (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (idx * 0.15) + (setIdx * 0.05) }}
                    key={setIdx} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-800/40 hover:bg-slate-800/60 transition-colors rounded-2xl border border-slate-700/30 group"
                  >
                    <div className="flex items-center gap-6 mb-3 sm:mb-0 w-full sm:w-auto">
                      <div className="flex flex-col w-24">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Sets x Reps</span>
                        <span className="text-white font-medium text-sm">
                          {set.setCount} × {set.reps}
                        </span>
                      </div>
                      <div className="flex flex-col w-16">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">% 1RM</span>
                        <span className="text-slate-300 font-medium text-sm">{set.percentage}%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 justify-between sm:justify-end w-full sm:w-auto mt-2 sm:mt-0">
                      {/* Plates Badge */}
                      {plates.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-700/50 min-h-[32px]">
                          <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Plates:</span>
                          <div className="flex flex-wrap gap-1">
                            {plates.map((plate, pIdx) => (
                              <span key={pIdx} className="text-xs font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                                {plate}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 bg-slate-900/30 px-3 py-1.5 rounded-xl border border-slate-700/50 min-h-[32px]">
                          <span className="text-[10px] font-bold text-slate-500 uppercase mr-1">Plates:</span>
                          <span className="text-xs font-bold text-slate-500">Bar Only</span>
                        </div>
                      )}

                      <div className="text-right min-w-[90px]">
                        <span className="block text-2xl font-black text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.2)] group-hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.4)] transition-all">
                          {set.weight} <span className="text-sm font-bold opacity-70 ml-1">{unit}</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}