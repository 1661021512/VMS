import React from 'react';
import { SystemEvent } from '../types';
import { Bell, User, MessageSquare } from 'lucide-react';

interface RightPanelProps {
  events: SystemEvent[];
}

const EVENT_TYPE_MAP: Record<string, string> = {
  'INFO': '信息',
  'WARNING': '警告',
  'ERROR': '错误'
};

const RightPanel: React.FC<RightPanelProps> = ({ events }) => {
  return (
    <div className="w-72 bg-slate-900 border-l border-slate-800 flex flex-col h-full">
      
      {/* Real-time Events */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-3 bg-slate-800/50 border-b border-slate-700 font-semibold flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-blue-400" />
            <span>实时告警</span>
          </div>
          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full animate-pulse">实时</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {events.map((evt) => (
            <div key={evt.id} className="bg-slate-800 p-3 rounded border-l-2 border-slate-700 hover:bg-slate-700/80 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                  evt.type === 'ERROR' ? 'bg-red-500/20 text-red-400' :
                  evt.type === 'WARNING' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {EVENT_TYPE_MAP[evt.type] || evt.type}
                </span>
                <span className="text-xs text-slate-500">{evt.timestamp}</span>
              </div>
              <div className="text-sm font-medium mb-0.5">{evt.deviceName}</div>
              <div className="text-xs text-slate-400">{evt.message}</div>
            </div>
          ))}
        </div>
      </div>

      {/* User Chat / Analysis Placeholder */}
      <div className="h-1/3 border-t border-slate-800 flex flex-col bg-slate-800/20">
        <div className="p-3 bg-slate-800/50 border-b border-slate-700 font-semibold flex items-center gap-2">
           <MessageSquare size={16} className="text-blue-400" />
           <span>运维通讯</span>
        </div>
        <div className="flex-1 p-3 overflow-y-auto text-xs text-slate-400 space-y-3">
            <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-600 flex-shrink-0 flex items-center justify-center text-[10px] text-white">OP</div>
                <div className="bg-slate-700 p-2 rounded-lg rounded-tl-none">
                    Cam-03 画面有异常吗？
                </div>
            </div>
             <div className="flex gap-2 flex-row-reverse">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-[10px] text-white">ME</div>
                <div className="bg-blue-600/20 p-2 rounded-lg rounded-tr-none text-slate-200">
                    正在检查回放。
                </div>
            </div>
        </div>
        <div className="p-2 border-t border-slate-700">
            <input 
                type="text" 
                placeholder="输入消息..." 
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-slate-200"
            />
        </div>
      </div>
      
    </div>
  );
};

export default RightPanel;