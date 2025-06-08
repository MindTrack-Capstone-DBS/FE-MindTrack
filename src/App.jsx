import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login-Page/LoginPage';
import Register from './pages/Register-Page/RegisterPage';
import LandingPage from './pages/landing-page/LandingPage';
import Profile from './pages/profile/Profile';
import ChatBox from './pages/chatbox/ChatBox';
import MoodJournal from "./pages/journal/MoodJournal";
import './App.css';
import JournalHistory from './pages/journal/JournalHistory';

function App() {
  // Check if user is logged in
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route - redirect to login if not authenticated, home if authenticated */}
          <Route path="/" element={<LandingPage />} />

          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          {/* Home and Profile now public */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<ChatBox />} />
          <Route path="/journal" element={<MoodJournal />} />
          <Route path="/journal/history" element={<JournalHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
