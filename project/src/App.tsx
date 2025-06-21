import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import WelcomePage from './pages/WelcomePage';
import EvaluationPage from './pages/EvaluationPage';
import CongratulationsPage from './pages/CongratulationsPage';
import WithdrawalPage from './pages/WithdrawalPage';
import SalesVideoPage from './pages/SalesVideoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route element={<Layout />}>
          <Route path="/evaluation" element={<EvaluationPage />} />
          <Route path="/congratulations" element={<CongratulationsPage />} />
          <Route path="/withdrawal" element={<WithdrawalPage />} />
          <Route path="/sales-video" element={<SalesVideoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;