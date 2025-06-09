import React from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../assets/images/Logo-cropped.png';

const Navbar = ({ variant = 'light' }) => {
  // variant: 'light' (biru tua di Home), 'dark' (biru tua di ChatBox), bisa dikembangkan
  // Untuk Home (light), menu biru, background lebih tipis dan soft
  const textColor = 'text-blue-900';
  const hoverColor = 'hover:text-blue-700';
  const bgColor = 'bg-white/60 backdrop-blur-lg shadow-sm transition-all duration-300';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full ${bgColor}`}>
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-8 md:px-14 py-4 md:py-6">
        <div className="flex items-center gap-2">
          <img src={logo2} alt="MindTrack Logo" className="w-60 max-w-full h-auto object-contain m-0 bg-none" />
        </div>
        <div className="flex items-center gap-9">
          <Link to="/landing" className={`${textColor} font-semibold text-lg ${hoverColor} transition`}>
            Beranda
          </Link>
          <Link to="/chat" className={`${textColor} font-semibold text-lg ${hoverColor} transition`}>
            ChatBox
          </Link>
          <Link to="/login" className="bg-blue-900 text-white rounded-xl px-8 py-3 font-semibold text-base mr-2 hover:bg-blue-800 transition text-center">
            Sign In
          </Link>
          <Link to="/register" className="bg-white text-blue-900 border-2 border-blue-900 rounded-xl px-8 py-3 font-semibold text-base hover:bg-blue-900 hover:text-white transition text-center">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
