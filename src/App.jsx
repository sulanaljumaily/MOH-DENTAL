import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import HealthEvalPage from './pages/HealthEvalPage';
import SpecializedEvalPage from './pages/SpecializedEvalPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/health-eval" element={<HealthEvalPage />} />
        <Route path="/specialized-eval" element={<SpecializedEvalPage />} />
      </Routes>
    </Router>
  );
}
