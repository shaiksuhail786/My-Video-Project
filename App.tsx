

import React, { useState, useCallback } from 'react';
import { InputForm } from './components/InputForm';
import { LoadingScreen } from './components/LoadingScreen';
import { VideoPlayer } from './components/VideoPlayer';
import { generateVideoFromContent } from './services/geminiService';
import { AppState, LoadingStep, VideoLength } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loadingStep, setLoadingStep] = useState<LoadingStep>(LoadingStep.ANALYZING);

  const handleGenerateVideo = useCallback(async (content: string, length: VideoLength) => {
    setAppState(AppState.LOADING);
    setErrorMessage('');
    setLoadingStep(LoadingStep.ANALYZING);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setLoadingStep(prevStep => {
          const steps = Object.values(LoadingStep);
          const currentIndex = steps.indexOf(prevStep);
          if (currentIndex < steps.length - 1) {
            return steps[currentIndex + 1];
          }
          return prevStep;
        });
      }, 5000); // Change step every 5 seconds

      const url = await generateVideoFromContent(content, length);
      clearInterval(progressInterval);
      setLoadingStep(LoadingStep.DONE);
      setVideoUrl(url);
      setAppState(AppState.SUCCESS);
    } catch (error) {
      console.error('Video generation failed:', error);
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      setErrorMessage(`Failed to generate video. ${message}`);
      setAppState(AppState.ERROR);
    }
  }, []);

  const handleStartOver = () => {
    setAppState(AppState.IDLE);
    setVideoUrl(null);
    setErrorMessage('');
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.LOADING:
        return <LoadingScreen currentStep={loadingStep} />;
      case AppState.SUCCESS:
        return videoUrl && <VideoPlayer videoUrl={videoUrl} onStartOver={handleStartOver} />;
      case AppState.IDLE:
      case AppState.ERROR:
      default:
        return (
          <InputForm
            onSubmit={handleGenerateVideo}
            // FIX: The `appState` in this code branch can only be `IDLE` or `ERROR`, so it can never be `LOADING`.
            // The previous comparison `appState === AppState.LOADING` was always false and caused a TypeScript error.
            isLoading={false}
            error={errorMessage}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            AI Video Forge
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Transform Your Ideas into Stunning Videos with AI
          </p>
        </header>
        <main className="bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-700 transition-all duration-500">
          {renderContent()}
        </main>
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by Google Gemini. Created for demonstration purposes.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;