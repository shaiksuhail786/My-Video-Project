
import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  onStartOver: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onStartOver }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Masterpiece is Ready!</h2>
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-gray-700 mb-6">
        <video src={videoUrl} controls className="w-full h-full">
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <a
          href={videoUrl}
          download="ai-generated-video.mp4"
          className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300"
        >
          Download Video
        </a>
        <button
          onClick={onStartOver}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300"
        >
          Forge Another Video
        </button>
      </div>
    </div>
  );
};
