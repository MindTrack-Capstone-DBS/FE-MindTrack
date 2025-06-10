import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo2 from '../assets/images/Logo-cropped.png';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Navbar = ({ variant = 'light' }) => {
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const location = useLocation();

  const toggleJournal = () => {
    setIsJournalOpen(!isJournalOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isJournalEntryActive = () => {
    return location.pathname === '/journal';
  };

  const isJournalHistoryActive = () => {
    return location.pathname === '/journal/history';
  };

  // variant: 'light' (biru tua di Home), 'dark' (biru tua di ChatBox), bisa dikembangkan
  // Untuk Home (light), menu biru, background lebih tipis dan soft
  const textColor = 'text-blue-900';
  const hoverColor = 'hover:text-blue-700';
  const bgColor = 'bg-white/60 backdrop-blur-lg shadow-sm transition-all duration-300';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-20 w-full ${bgColor}`}>
      <div className="h-20 max-w-[1440px] mx-auto flex items-center justify-between px-8 md:px-14 py-4 md:py-6">
        <div className="flex items-center gap-2">
          <img src={logo2} alt="MindTrack Logo" className="w-40 max-w-full h-auto object-contain m-0 bg-none" />
        </div>
        <div className="flex items-center gap-9">
          <Link to="/landing" className={`${textColor} font-semibold text-lg ${hoverColor} transition`}>
            Beranda
          </Link>

          {/* Journal Dropdown */}
          <div className="relative">
            <button
              onClick={toggleJournal}
              className={`${textColor} font-semibold text-lg ${hoverColor} transition flex items-center gap-1`}
            >
              Jurnal
              {isJournalOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isJournalOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-10">
                <Link
                  to="/journal"
                  className={`block px-4 py-2 text-blue-900 hover:bg-blue-50 transition text-sm ${
                    isJournalEntryActive() ? 'bg-blue-100' : ''
                  }`}
                >
                  Masukan Jurnal
                </Link>
                <Link
                  to="/journal/history"
                  className={`block px-4 py-2 text-blue-900 hover:bg-blue-50 transition text-sm ${
                    isJournalHistoryActive() ? 'bg-blue-100' : ''
                  }`}
                >
                  Riwayat Jurnal
                </Link>
              </div>
            )}
          </div>

          <Link to="/chat" className={`${textColor} font-semibold text-lg ${hoverColor} transition`}>
            ChatBox
          </Link>
          <Link
            to="/login"
            className="bg-blue-900 text-white rounded-xl px-8 py-3 font-semibold text-base mr-2 hover:bg-blue-800 transition text-center"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-white text-blue-900 border-2 border-blue-900 rounded-xl px-8 py-3 font-semibold text-base hover:bg-blue-900 hover:text-white transition text-center"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
