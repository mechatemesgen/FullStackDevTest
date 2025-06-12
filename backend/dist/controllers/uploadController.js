import { processCSV } from '../services/csvService.js';
const uploadFile = async (req, res) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }
    try {
        const resultFileName = await processCSV(req.file.path);
        const downloadLink = `/results/${resultFileName}`; // Removed /api prefix for frontend
        const response = { downloadLink, filename: resultFileName };
        res.json(response);
    }
    catch (error) {
        console.error('Error processing file:', error);
        res.status(500).send(`Error processing file: ${error.message}`);
    }
};
export default { uploadFile };
