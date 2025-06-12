import express from 'express';
import multer from 'multer';
import uploadController from '../controllers/uploadController.js';
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
router.post('/upload', upload.single('file'), uploadController.uploadFile);
export default router;
