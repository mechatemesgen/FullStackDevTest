import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import config from './config/config.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

(['uploadDir', 'resultDir'] as const).forEach(dir => {
  const dirPath = config[dir];
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
});


app.use(cors());
app.use(express.json());
app.use('/api', uploadRoutes);

app.get('/results/:filename', (req: Request, res: Response) => {
  const { filename } = req.params;

  if (!filename || /[\/\\]/.test(filename) || path.extname(filename).toLowerCase() !== '.csv') {
    return res.status(400).send('Invalid file request.');
  }

  const filePath = path.resolve(config.resultDir, filename);
  res.sendFile(filePath, (err: Error | null) => {
    if (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        return res.status(404).send(generate404Page());
      }
      return res.status(500).send('Error serving file.');
    }
  });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

function generate404Page(): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>404 - File Not Found</title>
      <style>
        body { background: #f9fafb; color: #111827; font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
        h1 { font-size: 6rem; color: #ef4444; margin-bottom: 1rem; }
        p { font-size: 1.5rem; margin-bottom: 2rem; }
        a { background: #2563eb; color: #fff; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; }
        a:hover { background: #1d4ed8; }
      </style>
    </head>
    <body>
      <h1>404</h1>
      <p>Oops! File not found or has been removed.</p>
      <a href="/">Go to Homepage</a>
    </body>
    </html>
  `;
}

export default app;