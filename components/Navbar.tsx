
import React, { useState } from 'react';

interface NavbarProps {
  onLoginClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-yellow-100 flex items-center justify-between px-6 z-50">
      <div className="flex-1"></div>
      
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
        <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-sm">
          <span className="text-white text-2xl font-bold">F</span>
        </div>
        <span className="text-2xl font-extrabold text-gray-800 tracking-tight">Funly</span>
      </div>

      <div className="flex-1 flex justify-end">
        <button 
          onClick={onLoginClick}
          className="px-6 py-2 rounded-full border-2 border-yellow-400 text-yellow-600 font-bold hover:bg-yellow-400 hover:text-white transition-all active:scale-95"
        >
          登录
        </button>
      </div>
    </nav>
  );
};
