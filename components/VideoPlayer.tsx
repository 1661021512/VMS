import React, { useState } from 'react';
import { Maximize, Play, Pause, Volume2, VideoOff } from 'lucide-react';
import { Device } from '../types';

interface VideoPlayerProps {
  device: Device | null;
  isMain?: boolean;
  onClick?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ device, isMain = false, onClick }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  if (!device) {
    return (
      <div 
        className={`bg-black flex flex-col items-center justify-center text-slate-500 border border-slate-800 h-full w-full ${isMain ? 'min-h-[400px]' : ''}`}
        onClick={onClick}
      >
        <div className="text-sm">无信号</div>
      </div>
    );
  }

  return (
    <div 
      className={`relative group bg-black overflow-hidden border border-slate-700 h-full w-full flex flex-col ${onClick ? 'cursor-pointer hover:border-blue-500' : ''}`}
      onClick={onClick}
    >
      {/* Status Overlay */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-2 bg-black/60 px-2 py-1 rounded text-xs text-white">
        <div className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-green-500' : device.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'} animate-pulse`} />
        <span className="font-mono">{device.name}</span>
        <span className="text-slate-400">|</span>
        <span className="font-mono text-slate-300">直播</span>
      </div>

      {/* Video Content (Mocked with Image for stability) */}
      {device.status === 'offline' ? (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-2">
          <VideoOff size={32} />
          <span>设备离线</span>
        </div>
      ) : (
        <div className="relative w-full h-full">
           <img 
            src={device.streamUrl} 
            alt={device.name} 
            className="w-full h-full object-cover opacity-90"
          />
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Play size={48} className="text-white opacity-80" />
            </div>
          )}
        </div>
      )}

      {/* Controls (Only show on hover or if it's the main player) */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 flex items-center justify-between transition-opacity duration-300 ${isMain ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
            className="text-white hover:text-blue-400 transition-colors"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button className="text-white hover:text-blue-400 transition-colors">
            <Volume2 size={18} />
          </button>
        </div>
        <button className="text-white hover:text-blue-400 transition-colors">
          <Maximize size={18} />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;