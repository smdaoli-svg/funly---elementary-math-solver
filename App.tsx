
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Result } from './components/Result';
import { LoginModal } from './components/LoginModal';
import { AppState, MathProblemResult } from './types';
import { analyzeMathProblem, generateStepImage } from './geminiService';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.HOME);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [result, setResult] = useState<MathProblemResult | null>(null);
  const [loadingMsg, setLoadingMsg] = useState('分析题目中...');

  const handleStartSolving = async (file: File) => {
    setState(AppState.LOADING);
    setLoadingMsg('正在分析题目，并构思插图...');

    try {
      const base64Image = await fileToBase64(file);
      
      // Step 1: Analyze problem
      const mathResult = await analyzeMathProblem(base64Image);
      setResult(mathResult);
      setState(AppState.RESULT);

      // Step 2: Generate images incrementally
      for (const step of mathResult.steps) {
        try {
          const imageUrl = await generateStepImage(step.imagePrompt);
          setResult(prev => {
            if (!prev) return prev;
            const newSteps = prev.steps.map(s => 
              s.stepNumber === step.stepNumber ? { ...s, imageUrl } : s
            );
            return { ...prev, steps: newSteps };
          });
        } catch (err) {
          console.error(`Failed to generate image for step ${step.stepNumber}`, err);
        }
      }
    } catch (error) {
      console.error("Error solving problem:", error);
      alert("出了点小问题，请稍后再试一次吧！");
      setState(AppState.HOME);
    }
  };

  const resetToHome = () => {
    setState(AppState.HOME);
    setResult(null);
  };

  return (
    <div className="min-h-screen">
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />
      
      <main className="container mx-auto">
        {state === AppState.HOME && (
          <Home onStartSolving={handleStartSolving} />
        )}

        {state === AppState.LOADING && (
          <div className="flex flex-col items-center justify-center pt-64">
            <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 border-8 border-yellow-100 rounded-full"></div>
              <div className="absolute inset-0 border-8 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl">🐵</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800 animate-pulse">{loadingMsg}</p>
            <p className="text-gray-500 mt-2">Momo 正在飞快地计算中...</p>
          </div>
        )}

        {state === AppState.RESULT && result && (
          <Result result={result} onBack={resetToHome} />
        )}
      </main>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <footer className="fixed bottom-0 left-0 right-0 h-2 bg-yellow-400"></footer>
    </div>
  );
};

export default App;
