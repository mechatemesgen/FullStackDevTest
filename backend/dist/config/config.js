import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const config = {
    port: parseInt(process.env.PORT || '3000', 10),
    uploadDir: path.resolve(__dirname, '../../uploads'),
    resultDir: path.resolve(__dirname, '../../results')
};
export default config;
