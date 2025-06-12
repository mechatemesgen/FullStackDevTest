import React, { useState } from 'react';
import { uploadCSV } from '../services/apiService';

const UploadForm = ({ setResultLink, setIsProcessing, result }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setIsProcessing(true);
    try {
      const { downloadLink, filename } = await uploadCSV(file);
      let cleanLink = downloadLink;
      if (cleanLink.startsWith('/api/')) {
        cleanLink = cleanLink.replace('/api', '');
      }
      setResultLink({ downloadLink: cleanLink, filename });
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (result) return null;

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div 
        className={`flex items-center justify-center w-full transition-all duration-200 ${isDragging ? 'scale-105' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        }`}>
          <div className="flex flex-col items-center justify-center p-5">
            <svg className={`w-10 h-10 mb-3 transition-all duration-200 ${
              isDragging ? 'text-blue-500 scale-110' : 'text-gray-500'
            }`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-600">
              <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400">CSV files only (MAX. 10MB)</p>
          </div>
          <input type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
        </label>
      </div>
      {file && (
        <div className="text-sm text-gray-600 bg-blue-50 rounded-lg p-3 flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {file.name}
        </div>
      )}
      <button
        onClick={handleSubmit}
        disabled={!file}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 ${
          file 
            ? 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg' 
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        Process File
      </button>
    </div>
  );
};

export default UploadForm;