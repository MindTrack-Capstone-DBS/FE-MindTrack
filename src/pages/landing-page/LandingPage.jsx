import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import headerBg from '../../assets/img/HDMindsMHFAcrop 1.jpg';
import pngtreeImg from '../../assets/images/pngtree-mental-health-depressed-man-on-floor-illustration-health-problem-worried-vector-png-image_50652722 1.png';
import { Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';

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
      <footer className="mt-auto bg-[#f5f7fa] pt-10 pb-6 border-t border-[#e6edfa] w-full rounded-t-3xl shadow-[0_-2px_16px_rgba(33,56,144,0.06)] relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-10 items-start">
          <div className="flex flex-col gap-2">
            <div className="text-xl text-blue-900 font-extrabold mb-2">MindTrack</div>
            <div className="text-blue-400 text-base mb-2">Track your mind, improve your life.</div>
            <div className="flex gap-4 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full bg-[#e6edfa] text-blue-900 hover:bg-[#1877f3] hover:text-white transition-all shadow hover:scale-110" title="Facebook">
                <Facebook size={28} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full bg-[#e6edfa] text-blue-900 hover:bg-[#0077b5] hover:text-white transition-all shadow hover:scale-110" title="LinkedIn">
                <Linkedin size={28} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full bg-[#e6edfa] text-blue-900 hover:bg-[#ff0000] hover:text-white transition-all shadow hover:scale-110" title="YouTube">
                <Youtube size={28} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full bg-[#e6edfa] text-blue-900 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-700 hover:text-white transition-all shadow hover:scale-110" title="Instagram">
                <Instagram size={28} />
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-center w-full">
            <div className="flex flex-col gap-2 min-w-[120px]">
              <div className="text-blue-900 font-bold mb-1">Fitur</div>
              <div className="text-blue-900 font-medium cursor-pointer hover:underline">Jurnal Harian</div>
              <div className="text-blue-900 font-medium cursor-pointer hover:underline">Analisis Emosi</div>
              <div className="text-blue-900 font-medium cursor-pointer hover:underline">Rekomendasi</div>
            </div>
            <div className="flex flex-col gap-2 min-w-[120px]">
              <div className="text-blue-900 font-bold mb-1">Bantuan</div>
              <div className="text-blue-900 font-medium cursor-pointer hover:underline">FAQ</div>
              <div className="text-blue-900 font-medium cursor-pointer hover:underline">Kontak</div>
              <div className="text-blue-900 font-medium cursor-pointer hover:underline">Tentang Kami</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-blue-900 font-medium">
            <div className="font-bold mb-1">Hubungi Kami:</div>
            <div>support@mindtrack.com</div>
            <div>+62 812-3456-7890</div>
          </div>
        </div>
        <div className="text-center text-blue-400 text-sm mt-8 border-t border-[#e6edfa] pt-5">
          &copy; {new Date().getFullYear()} MindTrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 