import { useState, useEffect } from 'react';
import axios from 'axios';

const useFileCheck = (downloadUrl) => {
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!downloadUrl) {
      setIsLoading(false);
      return;
    }
    const checkFileExists = async () => {
      setIsLoading(true);
      setNotFound(false);
      try {
        await axios.head(downloadUrl);
        setNotFound(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkFileExists();
  }, [downloadUrl]);

  return { isLoading, notFound };
};

export default useFileCheck;