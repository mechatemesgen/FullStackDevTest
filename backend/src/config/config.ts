import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Config {
  port: number;
  uploadDir: string;
  resultDir: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  uploadDir: path.resolve(__dirname, '../../uploads'),
  resultDir: path.resolve(__dirname, '../../results')
};

export default config;