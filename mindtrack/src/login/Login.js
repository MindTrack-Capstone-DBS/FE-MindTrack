import React, { useState } from 'react';
import './Login.css';

function Login({ onNavigateRegister }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="login-container">
      <div className="login-left">
        <h2 className="brand-title">
          <b>MindTrack</b> - <span className="brand-highlight">Track Your Stress</span>
        </h2>
        <h1 className="login-title">Login</h1>
        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Masukkan email anda" />
          <label>Password</label>
          <div className="password-input-wrapper">
            <input type={showPassword ? 'text' : 'password'} placeholder="Masukkan Password anda" />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              <svg height="20" width="20" viewBox="0 0 24 24"><path fill="#222" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zm0 13c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10a4 4 0 100 8 4 4 0 000-8z"/></svg>
            </span>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="login-link">
          Belum punya akun?{' '}
          <span className="link-action" onClick={onNavigateRegister}>Register</span>
        </div>
      </div>
      <div className="login-right">
        <div className="logo-circle">
          <img src="/Logo/logo_2-removebg-preview 1.png" alt="MindTrack Logo" className="logo-img" />
        </div>
      </div>
    </div>
  );
}

export default Login; 