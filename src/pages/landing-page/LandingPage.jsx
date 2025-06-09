import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import headerBg from '../../assets/img/HDMindsMHFAcrop 1.jpg';
import pngtreeImg from '../../assets/images/pngtree-mental-health-depressed-man-on-floor-illustration-health-problem-worried-vector-png-image_50652722 1.png';

const LandingPage = () => {
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
    <div className="min-h-screen flex flex-col font-sans bg-white text-[#222]">
      <header
        className="relative w-full min-h-[520px]"
        style={{
          backgroundImage: `url(${headerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-blue-900/35 rounded-b-3xl z-0"></div>
        <Navbar variant="light" />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">Track Your Mental Wellbeing</h1>
          <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow">Monitor your daily emotional state and get personalized suggestions for maintaining mental wellness.</p>
        </div>
      </header>
      <section className="flex flex-col md:flex-row items-center justify-center gap-16 py-20 px-6 max-w-5xl mx-auto w-full">
        <div className="flex-shrink-0 flex items-center justify-center relative w-[320px] h-[320px] md:w-[320px] md:h-[320px]">
          <img src={pngtreeImg} alt="Hero" className="w-full h-full object-contain rounded-full bg-[#e6edfa] p-8 shadow-lg hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="max-w-xl text-blue-900 text-left md:text-left text-lg font-normal">
          <h2 className="text-2xl md:text-2xl font-normal leading-relaxed">
            <b className="font-bold">MindTrack</b> helps you understand your mental state in depth through daily journals and periodic questionnaires. Using sentiment analysis and text processing technology, the platform <span className="font-bold text-blue-900">detects signs of stress, anxiety, and depression</span> and then recommends the right activities to <span className="font-bold text-blue-900">support your emotional balance</span>. Start your day with more calm and control with <b className="font-bold">MindTrack</b>.
          </h2>
        </div>
      </section>
      <section className="flex justify-center py-12 w-full bg-none">
        <div className="bg-white rounded-3xl shadow-xl px-12 py-10 text-center max-w-xl w-full -mt-8">
          <h3 className="text-blue-900 text-xl font-bold mb-4">How are you feeling today ?</h3>
          <p className="text-blue-400 text-base mb-8">Tell us everything that happened to you today and we will help you find ways to control your stress levels.</p>
          <button className="bg-blue-900 text-white rounded-xl px-10 py-4 font-bold text-base shadow-md hover:bg-blue-800 hover:scale-105 transition" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage; 