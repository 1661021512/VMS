import React from 'react';

const Timeline: React.FC = () => {
  // Generate mock time markers
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="h-16 bg-slate-900 border-t border-slate-700 flex flex-col justify-center px-4 relative select-none">
      {/* Cursor */}
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-red-500 z-20 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
        <div className="absolute -top-1 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-red-500"></div>
      </div>

      {/* Events Indicators (Mock) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[10%] w-[5%] h-2 bg-yellow-500/50 rounded z-0"></div>
      <div className="absolute top-1/2 -translate-y-1/2 left-[45%] w-[2%] h-2 bg-red-500/50 rounded z-0"></div>
      <div className="absolute top-1/2 -translate-y-1/2 left-[70%] w-[10%] h-2 bg-green-500/50 rounded z-0"></div>

      {/* Track */}
      <div className="w-full h-8 flex items-end justify-between text-[10px] text-slate-500 relative z-10">
        {hours.map((h) => (
          <div key={h} className="flex flex-col items-center gap-1 flex-1 border-l border-slate-700 h-full justify-end group cursor-pointer hover:bg-slate-800/50">
            <span className="mb-1">{h}:00</span>
            <div className="h-2 w-[1px] bg-slate-600 group-hover:bg-slate-400"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;