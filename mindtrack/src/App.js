import React, { useState } from 'react';
import Login from './login/Login';
import Register from './login/Register';
import './App.css';

function App() {
  const [page, setPage] = useState('login');
  return page === 'login' ? (
    <Login onNavigateRegister={() => setPage('register')} />
  ) : (
    <Register onNavigateLogin={() => setPage('login')} />
  );
}

export default App;
