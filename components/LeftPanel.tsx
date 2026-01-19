import React from 'react';
import { Device, VideoStats } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MapPin, Camera, AlertTriangle, Wifi, WifiOff } from 'lucide-react';

interface LeftPanelProps {
  devices: Device[];
  selectedDeviceId: string | null;
  onSelectDevice: (device: Device) => void;
  stats: VideoStats[];
}

const LeftPanel: React.FC<LeftPanelProps> = ({ devices, selectedDeviceId, onSelectDevice, stats }) => {
  return (
    <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-hidden">
      
      {/* Module 1: Device Status List */}
      <div className="flex-1 flex flex-col min-h-0 border-b border-slate-800">
        <div className="p-3 bg-slate-800/50 border-b border-slate-700 font-semibold flex items-center gap-2">
          <Camera size={16} className="text-blue-400" />
          <span>设备状态</span>
        </div>
        <div className="overflow-y-auto p-2 space-y-1">
          {devices.map((device) => (
            <div
              key={device.id}
              onClick={() => onSelectDevice(device)}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                selectedDeviceId === device.id
                  ? 'bg-blue-600/20 border border-blue-500/50'
                  : 'bg-slate-800 hover:bg-slate-700 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                {device.status === 'online' ? (
                  <Wifi size={16} className="text-green-500" />
                ) : device.status === 'warning' ? (
                  <AlertTriangle size={16} className="text-yellow-500" />
                ) : (
                  <WifiOff size={16} className="text-red-500" />
                )}
                <div>
                  <div className="text-sm font-medium">{device.name}</div>
                  <div className="text-xs text-slate-400">{device.region}</div>
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                device.status === 'online' ? 'bg-green-500' : 
                device.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
            </div>
          ))}
        </div>
      </div>

      {/* Module 2: Map Distribution */}
      <div className="h-64 border-b border-slate-800 flex flex-col">
        <div className="p-3 bg-slate-800/50 border-b border-slate-700 font-semibold flex items-center gap-2">
          <MapPin size={16} className="text-blue-400" />
          <span>设备分布</span>
        </div>
        <div className="flex-1 relative overflow-hidden bg-slate-950 group">
          {/* Placeholder Map Image */}
          <img 
            src="https://picsum.photos/400/300?grayscale" 
            alt="Map Background" 
            className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
          />
          
          {/* Mock Pins */}
          {devices.map((device, idx) => (
            <div 
              key={device.id}
              className="absolute cursor-pointer hover:scale-125 transition-transform group/pin"
              style={{ 
                top: `${30 + (idx * 10) % 50}%`, 
                left: `${20 + (idx * 15) % 60}%` 
              }}
              title={device.name}
              onClick={() => onSelectDevice(device)}
            >
              <MapPin 
                size={20} 
                className={`${
                  device.status === 'online' ? 'text-green-500' : 
                  device.status === 'warning' ? 'text-yellow-500' : 'text-red-500'
                } drop-shadow-lg`} 
                fill="currentColor"
              />
              {/* Tooltip on Map */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-black/80 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/pin:opacity-100 pointer-events-none">
                {device.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Module 3: Stats Histogram */}
      <div className="h-48 flex flex-col">
        <div className="p-3 bg-slate-800/50 border-b border-slate-700 font-semibold flex items-center gap-2">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
             <path d="M3 3v18h18" />
             <path d="M18 17V9" />
             <path d="M13 17V5" />
             <path d="M8 17v-3" />
           </svg>
          <span>事件统计</span>
        </div>
        <div className="flex-1 p-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats}>
              <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                itemStyle={{ color: '#93c5fd' }}
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
              />
              <Bar dataKey="events" radius={[2, 2, 0, 0]}>
                {stats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#3b82f6" fillOpacity={0.6 + (index / 10)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default LeftPanel;