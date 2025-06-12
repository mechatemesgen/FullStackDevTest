import React from 'react';
import UploadForm from './UploadForm';
import ProgressIndicator from './ProgressIndicator';
import ResultDownload from './ResultDownload';

const MainContent = ({ result, setResultLink, isProcessing, setIsProcessing, onGoBack }) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">CSV Processor</h1>
      {!result && (
        <UploadForm setResultLink={setResultLink} setIsProcessing={setIsProcessing} result={result} />
      )}
      <ProgressIndicator isProcessing={isProcessing} />
      {result && (
        <ResultDownload resultLink={result?.downloadLink} filename={result?.filename} onGoBack={onGoBack} />
      )}
    </>
  );
};

export default MainContent;