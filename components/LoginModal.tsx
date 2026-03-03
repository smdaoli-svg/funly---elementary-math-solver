
import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isRegister ? '加入 Funly' : '欢迎回来'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <button className="w-full py-3 px-4 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors mb-6 font-medium text-gray-700">
          <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
          使用 Google 账号登录
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">或者</span></div>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {isRegister && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">昵称</label>
              <input type="text" placeholder="你的名字" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">邮箱</label>
            <input type="email" placeholder="example@mail.com" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">密码</label>
            <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          </div>
          <button className="w-full py-4 bg-yellow-400 text-white font-bold rounded-xl shadow-lg hover:bg-yellow-500 transition-colors active:scale-[0.98]">
            {isRegister ? '创建账号' : '立即登录'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isRegister ? '已有账号？' : '还没有账号？'}{' '}
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-yellow-600 font-bold hover:underline"
          >
            {isRegister ? '立即登录' : '免费注册'}
          </button>
        </p>
      </div>
    </div>
  );
};
