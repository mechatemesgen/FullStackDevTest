import React, { useState } from 'react';

const ShareLink = ({ link }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex rounded-lg shadow-sm">
      <input
        type="text"
        value={link}
        readOnly
        className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        onFocus={e => e.target.select()}
      />
      <button
        onClick={copyToClipboard}
        className={`px-4 py-2 border border-l-0 border-gray-300 rounded-r-lg text-sm font-medium transition-colors ${
          isCopied ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default ShareLink;