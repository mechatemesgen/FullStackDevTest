# Frontend - Department Sales Aggregator UI

## Overview
This React (Vite) frontend provides a simple interface to upload CSV files, track processing progress, and download the aggregated results from the backend API.

## Features
- Upload CSV file to backend
- Progress indicator during processing
- Download link for result file
- Clean, modern UI

## Setup & Running
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the app:**
   ```sh
   npm run dev
   ```
   The app runs on `http://localhost:5173` (default Vite port).

## How to Use
1. Select a CSV file with columns: Department Name, Date, Number of Sales
2. Click 'Upload' to send to backend
3. Wait for processing (progress shown)
4. Download the result file when ready

## File Structure
- `src/`
  - `components/` - UI components (UploadForm, ProgressIndicator, ResultDownload, etc.)
  - `services/` - API communication logic
  - `hooks/` - Custom React hooks
  - `App.jsx` - Main app component
  - `main.jsx` - Entry point
- `public/` - Static assets

## Notes
- Communicates with backend using Axios
- Ensure backend is running and CORS is configured if needed

## Example Workflow
1. User uploads CSV
2. Progress is displayed
3. Download link appears when processing is complete
