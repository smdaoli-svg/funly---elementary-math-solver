
import React, { useState, useRef } from 'react';

interface HomeProps {
  onStartSolving: (file: File) => void;
}

export const Home: React.FC<HomeProps> = ({ onStartSolving }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-4xl mx-auto pt-32 px-4 pb-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          让数学题动起来！✨
        </h1>
        <p className="text-xl text-gray-600 font-medium">
          上传题目，三步变漫画，轻松学数学。
        </p>
      </div>

      <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-yellow-100 border-4 border-dashed border-yellow-200 relative group transition-all hover:border-yellow-400">
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          {!preview ? (
            <div 
              onClick={handleUploadClick}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-2">请上传您的题目</p>
              <p className="text-gray-500">点击这里或拖放图片</p>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden mb-8 shadow-md">
                <img src={preview} alt="Preview" className="w-full h-full object-contain bg-gray-100" />
                <button 
                  onClick={() => { setPreview(null); setSelectedFile(null); }}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <button 
                onClick={() => selectedFile && onStartSolving(selectedFile)}
                className="px-12 py-5 bg-yellow-400 text-white text-xl font-black rounded-2xl shadow-xl shadow-yellow-200 hover:bg-yellow-500 transition-all active:scale-95 flex items-center gap-3"
              >
                <span>开始答题</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
