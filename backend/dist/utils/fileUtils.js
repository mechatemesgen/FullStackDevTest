import { v4 as uuidv4 } from 'uuid';
import path from 'path';
const generateFileName = (originalName) => {
    const ext = path.extname(originalName);
    return `${uuidv4()}${ext}`;
};
export { generateFileName };
