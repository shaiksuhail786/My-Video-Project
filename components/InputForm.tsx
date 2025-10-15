
import React, { useState } from 'react';
import { InputType, VideoLength } from '../types';
import { TextIcon } from './icons/TextIcon';
import { FileIcon } from './icons/FileIcon';
import { LinkIcon } from './icons/LinkIcon';

interface InputFormProps {
  onSubmit: (content: string, length: VideoLength) => void;
  isLoading: boolean;
  error?: string;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading, error }) => {
  const [inputType, setInputType] = useState<InputType>(InputType.TEXT);
  const [textValue, setTextValue] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [fileName, setFileName] = useState('');
  const [videoLength, setVideoLength] = useState<VideoLength>(VideoLength.MEDIUM);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let content = '';
    switch (inputType) {
      case InputType.TEXT:
        content = textValue;
        break;
      case InputType.FILE:
        // In a real app, you'd process the file. Here, we simulate it.
        content = `[Content from uploaded file: ${fileName}]`;
        break;
      case InputType.URL:
        // In a real app, you'd scrape the URL. Here, we simulate it.
        content = `[Content from URL: ${urlValue}]`;
        break;
    }
    if (content.trim()) {
      onSubmit(content, videoLength);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  const renderInput = () => {
    switch (inputType) {
      case InputType.FILE:
        return (
          <div className="mt-4">
            <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 w-full text-center inline-block">
              {fileName ? `Selected: ${fileName}` : 'Choose a File...'}
            </label>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
             <p className="text-xs text-gray-500 mt-2">File content is simulated for this demo.</p>
          </div>
        );
      case InputType.URL:
        return (
          <div className="mt-4">
            <input
              type="url"
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
              placeholder="https://www.example.com"
              className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
            />
             <p className="text-xs text-gray-500 mt-2">Web page content is simulated for this demo.</p>
          </div>
        );
      case InputType.TEXT:
      default:
        return (
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Paste your script, article, or ideas here..."
            className="w-full h-40 bg-gray-900 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300 mt-4"
          />
        );
    }
  };
  
  const getTabClass = (type: InputType) => {
    const baseClass = "flex-1 py-2.5 text-sm font-medium leading-5 text-center rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-800 ring-white transition-all duration-300";
    return inputType === type ? "bg-purple-600 text-white shadow" : "text-gray-300 hover:bg-gray-700 hover:text-white";
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-md mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div className="bg-gray-700/50 p-1 rounded-lg flex space-x-1">
          <button type="button" onClick={() => setInputType(InputType.TEXT)} className={getTabClass(InputType.TEXT)}>
            <TextIcon className="w-5 h-5 inline-block mr-2"/>Text
          </button>
          <button type="button" onClick={() => setInputType(InputType.FILE)} className={getTabClass(InputType.FILE)}>
            <FileIcon className="w-5 h-5 inline-block mr-2"/>File
          </button>
          <button type="button" onClick={() => setInputType(InputType.URL)} className={getTabClass(InputType.URL)}>
            <LinkIcon className="w-5 h-5 inline-block mr-2"/>URL
          </button>
      </div>

      {renderInput()}

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Video Length</label>
        <div className="grid grid-cols-2 gap-4">
          <button type="button" onClick={() => setVideoLength(VideoLength.MEDIUM)} className={`p-4 rounded-md text-left transition-all duration-300 ${videoLength === VideoLength.MEDIUM ? 'bg-purple-600 ring-2 ring-purple-400' : 'bg-gray-700 hover:bg-gray-600'}`}>
            <p className="font-bold">Medium</p>
            <p className="text-sm text-gray-300">5-10 minutes</p>
          </button>
          <button type="button" onClick={() => setVideoLength(VideoLength.LONG)} className={`p-4 rounded-md text-left transition-all duration-300 ${videoLength === VideoLength.LONG ? 'bg-purple-600 ring-2 ring-purple-400' : 'bg-gray-700 hover:bg-gray-600'}`}>
            <p className="font-bold">Long</p>
            <p className="text-sm text-gray-300">20-30 minutes</p>
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-8 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Forge My Video'
        )}
      </button>
    </form>
  );
};
