import axios from 'axios';

export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const uploadUrl = `/api/upload`;  
  const response = await axios.post(uploadUrl, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};
