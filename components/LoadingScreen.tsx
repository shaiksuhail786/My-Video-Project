
import React from 'react';
import { LoadingStep } from '../types';

interface LoadingScreenProps {
  currentStep: LoadingStep;
}

const loadingSteps = Object.values(LoadingStep);
const reassuringMessages = [
  "Our AI is warming up its creative circuits...",
  "Crafting the perfect narrative for you...",
  "Polishing pixels and rendering brilliance...",
  "This can take a few minutes. Great art needs patience!",
  "Finalizing the high-resolution output...",
  "Almost there! The final touches are being applied."
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ currentStep }) => {
  const currentIndex = loadingSteps.indexOf(currentStep);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 border-4 border-t-purple-500 border-gray-600 rounded-full animate-spin mb-6"></div>
      <h2 className="text-2xl font-bold text-white mb-4">Your Video is Being Forged</h2>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">{reassuringMessages[currentIndex % reassuringMessages.length]}</p>
      
      <div className="w-full max-w-sm space-y-4">
        {loadingSteps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 transition-all duration-500 ${index < currentIndex ? 'bg-green-500' : index === currentIndex ? 'bg-purple-500 animate-pulse' : 'bg-gray-700'}`}>
              {index < currentIndex ? (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              ) : index === currentIndex ? (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              ) : (
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              )}
            </div>
            <span className={`transition-colors duration-500 ${index <= currentIndex ? 'text-white' : 'text-gray-500'}`}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
