import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login-Page/LoginPage';
import Register from './pages/Register-Page/RegisterPage';
import LandingPage from './pages/landing-page/LandingPage';
import Profile from './pages/profile/Profile';
import ChatBox from './pages/chatbox/ChatBox';
import MoodJournal from './pages/journal/MoodJournal';
import './App.css';
import JournalHistory from './pages/journal/JournalHistory';
import Dashboard from './pages/Dashboard-Page/Dashboard-Page';
import AboutUs from './pages/aboutUs/aboutUs';
import FAQPage from './pages/faq/faq';

function App() {
  // Check if user is logged in
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true' || false;

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route - redirect to dashboard if authenticated, landing if not */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} />

          {/* Public routes */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="/landing" element={<LandingPage />} />

          {/* Public pages - No authentication required */}
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/faq" element={<FAQPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatBox />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journal"
            element={
              <ProtectedRoute>
                <MoodJournal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journal/history"
            element={
              <ProtectedRoute>
                <JournalHistory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
