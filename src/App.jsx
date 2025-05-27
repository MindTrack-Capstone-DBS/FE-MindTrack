import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect otomatis ke halaman Profile */}
          <Route path="/" element={<Navigate to="/profile" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
