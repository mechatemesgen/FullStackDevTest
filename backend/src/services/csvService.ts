import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { generateFileName } from '../utils/fileUtils.js';
import config from '../config/config.js';

interface AggregatedSales {
  [key: string]: number;
}

interface CSVRow {
  [key: string]: string;
}

const processCSV = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const aggregatedSales: AggregatedSales = {};
    let isFirstRow = true;

    fs.createReadStream(filePath)
      .pipe(csv({ headers: false, skipLines: 0 }))
      .on('data', (row: CSVRow) => {
        // If the first row looks like a header, skip it
        if (isFirstRow && (row[0] === 'Department Name' || row[0] === 'Department' || row[2] === 'Number of Sales')) {
          isFirstRow = false;
          return;
        }
        isFirstRow = false;
        const department = row[0];
        const sales = parseInt(row[2], 10);
        if (department && !isNaN(sales)) {
          aggregatedSales[department] = (aggregatedSales[department] || 0) + sales;
        }
      })
      .on('end', () => {
        const resultFileName = generateFileName('result.csv');
        const resultPath = path.join(config.resultDir, resultFileName);
        const writeStream = fs.createWriteStream(resultPath);

        writeStream.on('finish', () => {
          fs.unlink(filePath, () => {}); // ignore error
          resolve(resultFileName);
        });

        writeStream.on('error', (err: Error) => {
          fs.unlink(filePath, () => {});
          reject(err);
        });

        for (const [department, total] of Object.entries(aggregatedSales)) {
          writeStream.write(`${department},${total}\n`);
        }
        writeStream.end();
      })
      .on('error', (err: Error) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });
  });
};

export { processCSV };