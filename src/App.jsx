import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login-Page/LoginPage';
import Register from './pages/Register-Page/RegisterPage';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import './App.css';

function App() {
  // Check if user is logged in
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route - redirect to login if not authenticated, home if authenticated */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />

          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          {/* Home and Profile now public */}
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
