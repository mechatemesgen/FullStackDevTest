import React from 'react';
import { useParams } from 'react-router-dom';
import ShareLink from './ShareLink';
import useFileCheck from '../hooks/useFileCheck'; 

const ResultPage = () => {
  const { filename } = useParams();
  const downloadUrl = `/results/${filename}`;
  const { isLoading, notFound } = useFileCheck(downloadUrl);

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className="animate-pulse flex space-x-4 items-center">
        <div className="rounded-full bg-blue-100 h-8 w-8"></div>
        <div className="text-gray-600">Checking file...</div>
      </div>
    </div>
  );

  if (notFound) return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md w-full text-center">
        <svg className="w-10 h-10 mx-auto text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h2 className="text-xl font-semibold text-gray-800">File not found</h2>
        <p className="text-gray-600 mt-2">The requested file could not be located.</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full">
        <div className="text-center space-y-4">
          <svg className="w-12 h-12 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h1 className="text-2xl font-bold text-gray-800">Your file is ready!</h1>
          <p className="text-gray-600">Download your processed CSV file below.</p>
          
          <a
            href={downloadUrl}
            download={filename}
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-200 w-full"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Download CSV
          </a>
        </div>
        <div className="mt-6 space-y-2">
          <label className="text-sm font-medium text-gray-700">Shareable link</label>
          <ShareLink link={window.location.origin + `/results/${filename}`} />
        </div>
      </div>
    </div>
  );
};

export default ResultPage;