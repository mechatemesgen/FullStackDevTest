import React from 'react';
import ShareLink from './ShareLink';
import useFileCheck from '../hooks/useFileCheck'; 

const ResultDownload = ({ resultLink, filename, onGoBack }) => {
  const { isLoading, notFound } = useFileCheck(resultLink);

  if (!resultLink) return null;

  if (isLoading) return (
    <div className="flex justify-center p-6">
      <div className="animate-pulse flex space-x-4 items-center">
        <div className="rounded-full bg-blue-100 h-6 w-6"></div>
        <div className="text-gray-600">Checking file...</div>
      </div>
    </div>
  );

  if (notFound) return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center max-w-md mx-auto">
      <svg className="w-8 h-8 mx-auto text-red-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <h3 className="font-medium text-gray-800">File not found</h3>
      <p className="text-sm text-gray-600 mt-1">The requested file could not be located.</p>
    </div>
  );

  const absoluteUrl = window.location.origin + resultLink;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-md w-full mx-auto relative">
      <button
        onClick={onGoBack}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <div className="text-center space-y-4">
        <svg className="w-12 h-12 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h2 className="text-xl font-bold text-gray-800">Processing Complete</h2>
        <p className="text-gray-600">Your file is ready to download</p>
        <a
          href={resultLink}
          download
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-200 w-full"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          Download File
        </a>
      </div>
      <div className="mt-6 space-y-2">
        <label className="text-sm font-medium text-gray-700">Shareable link</label>
        <ShareLink link={absoluteUrl} />
      </div>
    </div>
  );
};

export default ResultDownload;
