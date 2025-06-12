import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import MainContent from './components/MainContent';
import ResultPage from './components/ResultPage';

function App() {
  const [result, setResultLink] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGoBack = () => {
    setResultLink(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <MainContent
                result={result}
                setResultLink={setResultLink}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
                onGoBack={handleGoBack}
              />
            </Layout>
          }
        />
        <Route path="/results/:filename" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;