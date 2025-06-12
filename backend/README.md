# Backend - Department Sales Aggregator API

## Overview
This Node.js + Express.js backend processes large CSV files containing departmental sales data. It aggregates total sales per department and returns a downloadable CSV result. Designed for high performance and memory efficiency using streaming.

## Features
- Upload CSV files via `/upload` endpoint
- Aggregates total sales per department
- Streams large files (memory efficient)
- Generates downloadable result CSVs (UUID-named)
- Modular, scalable, and testable TypeScript code
- (Bonus) Unit tests with Jest, background processing, response metrics, secure routes

## Setup & Running
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the server:**
   ```sh
   npm start
   ```
   The server runs on `http://localhost:PORT` (see config).

## API Usage
- **POST** `/upload` (multipart/form-data, field: `file`)
  - Upload a CSV file with columns: Department Name, Date, Number of Sales
  - Response: JSON with download link to result file

## Algorithm & Memory Efficiency
- Uses Node.js streams and `csv-parser` to process files row-by-row, never loading the entire file into memory.
- Aggregates sales in a JavaScript object keyed by department, then writes results as a stream.
- Suitable for files much larger than available RAM.

### Big O Complexity
- **Time:** O(N) where N = number of rows in the CSV
- **Space:** O(D) where D = number of unique departments (much smaller than N)

## File Structure
- `src/`
  - `app.ts` - Express app entry
  - `controllers/` - Route handlers
  - `services/` - CSV processing logic
  - `routes/` - API routes
  - `utils/` - File utilities
- `uploads/` - Uploaded files
- `results/` - Processed result files

## Notes
- Output files are named with UUIDs for uniqueness
- (Bonus) Background processing and metrics available in advanced branches

## Example
**Input:**
```
Department Name,Date,Number of Sales
Electronics,2023-08-01,100
Clothing,2023-08-01,200
Electronics,2023-08-02,150
```
**Output:**
```
Department Name,Total Number of Sales
Electronics,250
Clothing,200
```


