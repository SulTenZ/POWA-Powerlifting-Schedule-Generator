// src/components/ScheduleTable.jsx
import React from 'react';

export default function ScheduleTable({ liftData, liftName }) {
  return (
    <div className="mb-2">
      <h3 className="text-xl font-black text-yellow-500 mb-8 uppercase tracking-widest border-l-4 border-yellow-500 pl-4 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
        {liftName}
      </h3>
      
      <div className="space-y-8">
        {liftData.map(week => (
          <div key={week.week} className="bg-slate-900/40 p-6 rounded-2xl border border-slate-700/30">
            <h4 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4 pl-2">
              Week {week.week}
            </h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-700/50">
                    <th className="py-3 px-4 font-bold text-slate-300 uppercase tracking-wider text-xs">Sets</th>
                    <th className="py-3 px-4 font-bold text-slate-300 uppercase tracking-wider text-xs">Reps</th>
                    <th className="py-3 px-4 font-bold text-slate-300 uppercase tracking-wider text-xs">%</th>
                    <th className="py-3 px-4 font-bold text-slate-300 uppercase tracking-wider text-xs">Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {week.sets.map((set, idx) => (
                    <tr 
                      key={idx} 
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-4 px-4 text-slate-300 font-medium">
                        {set.setCount > 1 ? `${set.setCount} sets` : '1 set'}
                      </td>
                      <td className="py-4 px-4 text-slate-300 font-medium whitespace-nowrap">
                        {set.reps}
                      </td>
                      <td className="py-4 px-4 text-slate-500 font-medium whitespace-nowrap">
                        {set.percentage}%
                      </td>
                      <td className="py-4 px-4 text-yellow-400 font-black text-lg whitespace-nowrap drop-shadow-[0_0_5px_rgba(250,204,21,0.2)]">
                        {set.weight} kg
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}