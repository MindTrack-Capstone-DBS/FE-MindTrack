import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';
import logo2 from '../../assets/images/logo_2-removebg-preview 1.png';

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    setIsLoggedIn(auth);
  }, []);

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header
        className="home-header"
        style={{
          background: "url('/img/HDMindsMHFAcrop 1.jpg') center/cover no-repeat",
          minHeight: 260,
          position: 'relative'
        }}
      >
        <div className="logo-section">
          <img src={logo2} alt="MindTrack Logo" className="logo" />
        </div>
        <nav className="nav-links">
          <Link to="/">Beranda</Link>
          <Link to="/chat">ChatBox</Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile">Profile</Link>
              <button className="sign-out" onClick={handleLogout}>Sign Out</button>
            </>
          ) : (
            <>
              <button className="sign-in" onClick={handleSignIn}>Sign In</button>
              <button className="sign-up" onClick={handleSignUp}>Sign Up</button>
            </>
          )}
        </nav>
        <div className="header-overlay" />
      </header>
      <section className="hero-section">
        <div className="hero-img-wrapper">
          <img src="/Logo/pngtree-mental-health-depressed-man-on-floor-illustration-health-problem-worried-vector-png-image_50652722 1.png" alt="Hero" className="hero-img" />
        </div>
        <div className="hero-text">
          <h2>
            <b>MindTrack</b> helps you understand your mental state in depth through daily journals and periodic questionnaires. Using sentiment analysis and text processing technology, the platform <span className="highlight">detects signs of stress, anxiety, and depression</span> and then recommends the right activities to <span className="highlight">support your emotional balance</span>. Start your day with more calm and control with <b>MindTrack</b>.
          </h2>
        </div>
      </section>
      <section className="feeling-section">
        <div className="feeling-box">
          <h3>How are you feeling today ?</h3>
          <p>Tell us everything that happened to you today and we will help you find ways to control your stress levels.</p>
          <button className="get-started" onClick={handleGetStarted}>
            {isLoggedIn ? 'Go to Profile' : 'Get Started'}
          </button>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-content">
          <div className="site-name">MindTrack</div>
          <div className="footer-links">
            <div className="footer-topic">
              <div>About</div>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
            <div className="footer-topic">
              <div>Resources</div>
              <Link to="/blog">Blog</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/support">Support</Link>
            </div>
            <div className="footer-topic">
              <div>Connect</div>
              <Link to="/community">Community</Link>
              <Link to="/events">Events</Link>
              <Link to="/newsletter">Newsletter</Link>
            </div>
          </div>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 