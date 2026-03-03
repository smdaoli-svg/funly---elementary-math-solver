
import React, { useState, useEffect } from 'react';
import { MathProblemResult } from '../types';

interface ResultProps {
  result: MathProblemResult;
  onBack: () => void;
}

export const Result: React.FC<ResultProps> = ({ result, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const currentStepData = result.steps.find(s => s.stepNumber === currentStep);

  return (
    <div className="max-w-5xl mx-auto pt-28 px-4 pb-20">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-yellow-100 mb-8">
        <h3 className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-2">原题目</h3>
        <p className="text-lg text-gray-800 font-medium leading-relaxed">
          {result.originalText}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-4 shadow-xl shadow-yellow-50 border border-yellow-50 aspect-square flex items-center justify-center relative overflow-hidden">
          {currentStepData?.imageUrl ? (
            <img 
              key={currentStepData.imageUrl}
              src={currentStepData.imageUrl} 
              alt={`Step ${currentStep}`} 
              className="w-full h-full object-cover rounded-[2rem] animate-in fade-in duration-700"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-400 rounded-full animate-spin mb-4"></div>
              <p className="font-bold">插图生成中...</p>
            </div>
          )}
          <div className="absolute top-8 left-8 bg-yellow-400 text-white text-xl font-black px-6 py-2 rounded-2xl shadow-lg">
            步骤 {currentStep}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-yellow-50 border border-yellow-50 min-h-[300px]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-sm">💡</span>
              思路解析
            </h2>
            <div key={currentStep} className="text-lg text-gray-700 leading-relaxed font-medium animate-in slide-in-from-right-4 duration-500">
              {currentStepData?.description}
            </div>
          </div>

          <div className="flex items-center justify-between p-2 bg-white rounded-2xl shadow-lg border border-yellow-50">
            {[1, 2, 3].map((step) => (
              <button
                key={step}
                onClick={() => setCurrentStep(step)}
                className={`flex-1 py-4 text-lg font-bold rounded-xl transition-all ${
                  currentStep === step 
                    ? 'bg-yellow-400 text-white shadow-md scale-105' 
                    : 'text-gray-400 hover:text-yellow-500'
                }`}
              >
                第 {step} 步
              </button>
            ))}
          </div>

          {currentStep === 3 && (
            <button 
              onClick={onBack}
              className="w-full py-5 bg-gray-900 text-white text-xl font-bold rounded-[2rem] shadow-xl hover:bg-gray-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回首页
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
