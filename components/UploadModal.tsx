import React, { useState, useEffect } from 'react';
import { Upload, X, Check, FileVideo } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
        setUploading(false);
        setProgress(0);
        setCompleted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUploadSim = () => {
    setUploading(true);
    let curr = 0;
    const interval = setInterval(() => {
      curr += Math.random() * 10;
      if (curr >= 100) {
        curr = 100;
        clearInterval(interval);
        setCompleted(true);
        setUploading(false);
      }
      setProgress(curr);
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-[500px] rounded-lg shadow-2xl p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Upload size={24} className="text-blue-500" />
          本地视频上传
        </h2>

        {!uploading && !completed && (
          <div 
            className={`border-2 border-dashed rounded-lg h-48 flex flex-col items-center justify-center transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600 hover:border-slate-500 bg-slate-800/50'
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { 
              e.preventDefault(); 
              setIsDragging(false); 
              handleUploadSim();
            }}
          >
            <div className="p-4 rounded-full bg-slate-800 mb-4">
              <Upload size={32} className="text-slate-400" />
            </div>
            <p className="text-sm text-slate-300 font-medium">点击上传 或 拖拽文件</p>
            <p className="text-xs text-slate-500 mt-2">支持 MP4, MKV, AVI (最大 2GB)</p>
            {/* Input is functional but hidden styling wise to use the div area */}
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={handleUploadSim}
            />
          </div>
        )}

        {uploading && (
          <div className="py-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">正在上传 surveillance_dump_04.mp4...</span>
              <span className="text-blue-400">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 text-xs text-center text-slate-500">
               分片上传进行中...
            </div>
          </div>
        )}

        {completed && (
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-4">
              <Check size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">上传成功</h3>
            <p className="text-sm text-slate-400">视频已处理并添加到媒体库。</p>
            
            <button 
              onClick={onClose}
              className="mt-6 bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded transition-colors"
            >
              关闭
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadModal;