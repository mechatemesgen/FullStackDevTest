import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import config from '../config/config';

const generateFileName = (originalName: string): string => {
  const ext = path.extname(originalName);
  return `${uuidv4()}${ext}`;
};

export { generateFileName };