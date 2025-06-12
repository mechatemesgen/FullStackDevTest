import React from 'react';
import ShareLink from './ShareLink';
import useFileCheck from '../hooks/useFileCheck';

const CustomDownload = ({ downloadUrl }) => {
  const { isLoading, notFound } = useFileCheck(downloadUrl);

  if (isLoading) return <div>Loading...</div>;
  if (notFound) return <div>File not found</div>;

  return (
    <div className="flex flex-col items-center gap-4">
      <a
        href={downloadUrl}
        download
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg transition hover:bg-blue-700 shadow-md hover:shadow-lg"
      >
        Download File
      </a>
      <ShareLink link={window.location.origin + downloadUrl} />
    </div>
  );
};

export default CustomDownload;
