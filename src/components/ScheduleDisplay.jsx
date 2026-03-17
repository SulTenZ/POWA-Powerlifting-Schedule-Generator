// src/components/ScheduleDisplay.jsx
import React from 'react';
import { Download, RefreshCw } from 'lucide-react';
import ScheduleTable from './ScheduleTable';

export default function ScheduleDisplay({ schedule, onReset, onExportPDF }) {
  return (
    <div className="animate-slide-up delay-75">
      <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-3xl p-8 md:p-12 transition-all duration-300">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
              Your Training Schedule
            </h2>
            <p className="text-slate-400 font-medium tracking-wide">
              Based on 5/3/1 methodology
            </p>
          </div>
          
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold transition-all hover:shadow-lg w-full md:w-auto self-start border border-slate-700/50"
          >
            <RefreshCw className="w-4 h-4" />
            <span>New Schedule</span>
          </button>
        </div>

        {/* Schedule Table (Single Movement) */}
        <div className="animate-fade-in delay-150">
          <ScheduleTable liftData={schedule.data} liftName={schedule.movement.toUpperCase()} />
        </div>

        {/* Export PDF Button */}
        <button
          onClick={onExportPDF}
          className="w-full mt-12 bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold py-5 px-6 rounded-2xl text-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 group"
        >
          <Download className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform" />
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  );
}