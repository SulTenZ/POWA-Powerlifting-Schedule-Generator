// src/components/InputForm.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import OneRepMaxEstimator from './OneRepMaxEstimator';

export default function InputForm({ formData, onInputChange, onGenerate, unit }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-xl mx-auto"
    >
      <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-3xl p-8 md:p-12 transition-all duration-300 hover:border-slate-600/50">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Calculate 1RM</h2>
          <p className="text-slate-400 font-medium">Select a movement to generate your schedule.</p>
        </div>
        
        <div className="space-y-8">
          {/* Movement Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-bold tracking-wide text-white uppercase">
              Movement
            </label>
            <div className="relative group">
              <select
                name="movement"
                value={formData.movement}
                onChange={onInputChange}
                className="w-full appearance-none bg-slate-900/60 border border-slate-700/50 rounded-2xl px-6 py-4 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all cursor-pointer hover:bg-slate-800/60"
              >
                <option value="squat" className="bg-slate-900">Squat</option>
                <option value="bench" className="bg-slate-900">Bench Press</option>
                <option value="deadlift" className="bg-slate-900">Deadlift</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-slate-400 group-hover:text-yellow-400 transition-colors">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Weight Input */}
            <div className="space-y-3">
              <label className="block text-sm font-bold tracking-wide text-white uppercase">
                Weight ({unit})
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={onInputChange}
                className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl px-6 py-4 text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all placeholder:font-normal placeholder:text-slate-500 hover:bg-slate-800/60"
                placeholder="e.g. 100"
                min="0"
                step="0.5"
              />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          className="w-full mt-10 bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black py-5 px-6 rounded-2xl text-lg flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:-translate-y-1"
        >
          <span>GENERATE SCHEDULE</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* 1RM Estimator Integration */}
      <OneRepMaxEstimator />
    </motion.div>
  );
}