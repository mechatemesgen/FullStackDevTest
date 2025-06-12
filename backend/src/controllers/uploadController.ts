import { Request, Response } from 'express';
import { processCSV } from '../services/csvService.js';
import path from 'path';
import config from '../config/config';

interface UploadResponse {
  downloadLink: string;
  filename: string;
}

const uploadFile = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  try {
    const resultFileName = await processCSV(req.file.path);
    const downloadLink = `/results/${resultFileName}`; // Removed /api prefix for frontend
    const response: UploadResponse = { downloadLink, filename: resultFileName };
    res.json(response);
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send(`Error processing file: ${(error as Error).message}`);
  }
};

export default { uploadFile };