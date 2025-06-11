import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo2 from '../assets/images/Logo-cropped.png';
import { ChevronDown, ChevronUp, Bell, Settings, LogOut } from 'lucide-react';

const Navbar = ({ variant = 'light', isLandingPage = false, userData, dashboardData }) => {
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleJournal = () => {
    setIsJournalOpen(!isJournalOpen);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
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

  const handleLogoClick = () => {
    if (!isLandingPage) {
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/');
    window.location.reload();
  };

  // variant: 'light' (biru tua di Home), 'dark' (biru tua di ChatBox), bisa dikembangkan
  // Untuk Home (light), menu biru, background lebih tipis dan soft
  const textColor = 'text-blue-900';
  const hoverColor = 'hover:text-blue-700';
  const bgColor = 'bg-white/60 backdrop-blur-lg shadow-sm transition-all duration-300';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-20 w-full ${bgColor}`}>
      <div className="h-20 max-w-[1440px] mx-auto flex items-center justify-between px-8 md:px-14 py-4 md:py-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo2} alt="MindTrack Logo" className="w-40 max-w-full h-auto object-contain m-0 bg-none cursor-pointer" onClick={handleLogoClick} />
        </div>
        
        {/* Center Navigation Menu */}
        <div className="flex items-center gap-9">
          {isLandingPage ? (
            // Menu untuk Landing Page
            <>
              <Link to="/landing" className={`${textColor} font-semibold text-lg ${hoverColor} transition`}>
                Beranda
              </Link>

              {/* Journal Dropdown */}
              <div className="relative">
                <button onClick={toggleJournal} className={`${textColor} font-semibold text-lg ${hoverColor} transition flex items-center gap-1`}>
                  Jurnal
                  {isJournalOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isJournalOpen && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-white rounded-xl shadow-xl overflow-hidden z-20 min-w-[200px] border border-gray-100">
                    <div className="py-2">
                      <Link to="/journal" className={`block px-6 py-3 text-blue-900 hover:bg-blue-50 transition text-sm font-medium ${isJournalEntryActive() ? 'bg-blue-100 border-r-4 border-blue-500' : ''}`}>
                        📝 Masukan Jurnal
                      </Link>
                      <Link to="/journal/history" className={`block px-6 py-3 text-blue-900 hover:bg-blue-50 transition text-sm font-medium ${isJournalHistoryActive() ? 'bg-blue-100 border-r-4 border-blue-500' : ''}`}>
                        📚 Riwayat Jurnal
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/chat" className={`${textColor} font-semibold text-lg ${hoverColor} transition`}>
                ChatBox
              </Link>
            </>
          ) : (
            // Menu untuk halaman setelah login (Dashboard, Journal, ChatBox)
            <>
              <Link to="/dashboard" className={`${textColor} font-semibold text-lg ${hoverColor} transition ${isActive('/dashboard') ? 'border-b-2 border-blue-900' : ''}`}>
                Beranda
              </Link>

              {/* Journal Dropdown */}
              <div className="relative">
                <button onClick={toggleJournal} className={`${textColor} font-semibold text-lg ${hoverColor} transition flex items-center gap-1 ${(isJournalEntryActive() || isJournalHistoryActive()) ? 'border-b-2 border-blue-900' : ''}`}>
                  Jurnal
                  {isJournalOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isJournalOpen && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-white rounded-xl shadow-xl overflow-hidden z-20 min-w-[200px] border border-gray-100">
                    <div className="py-2">
                      <Link to="/journal" className={`block px-6 py-3 text-blue-900 hover:bg-blue-50 transition text-sm font-medium ${isJournalEntryActive() ? 'bg-blue-100 border-r-4 border-blue-500' : ''}`}>
                        📝 Masukan Jurnal
                      </Link>
                      <Link to="/journal/history" className={`block px-6 py-3 text-blue-900 hover:bg-blue-50 transition text-sm font-medium ${isJournalHistoryActive() ? 'bg-blue-100 border-r-4 border-blue-500' : ''}`}>
                        📚 Riwayat Jurnal
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/chat" className={`${textColor} font-semibold text-lg ${hoverColor} transition ${isActive('/chat') ? 'border-b-2 border-blue-900' : ''}`}>
                ChatBox
              </Link>
            </>
          )}
        </div>

        {/* Right Side - Auth buttons for landing page OR Profile section for dashboard */}
        <div className="flex items-center gap-4">
          {isLandingPage ? (
            // Auth buttons untuk Landing Page
            <>
              <Link to="/login" className="bg-blue-900 text-white rounded-xl px-8 py-3 font-semibold text-base mr-2 hover:bg-blue-800 transition text-center">
                Sign In
              </Link>
              <Link to="/register" className="bg-white text-blue-900 border-2 border-blue-900 rounded-xl px-8 py-3 font-semibold text-base hover:bg-blue-900 hover:text-white transition text-center">
                Sign Up
              </Link>
            </>
          ) : (
            // Profile section untuk Dashboard
            <>
              {/* Status (Anxiety) */}
              <div className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                {dashboardData?.stressLevel > 70 ? 'High Anxiety' : dashboardData?.stressLevel > 40 ? 'Moderate' : 'Low Anxiety'}
              </div>

              {/* Notification Icon */}
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-blue-50 transition-colors">
                  <Bell className="w-6 h-6 text-blue-900" />
                  <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
              </div>

              {/* Profile with Dropdown */}
              <div className="relative">
                <button onClick={toggleProfileMenu} className="flex items-center gap-2 focus:outline-none hover:bg-blue-50 rounded-full p-1 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center text-white font-bold shadow-sm">
                    {userData?.name
                      ? userData.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()
                          .substring(0, 2)
                      : 'U'}
                  </div>
                  <ChevronDown className="w-4 h-4 text-blue-900" />
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl py-2 z-20 border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{userData?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{userData?.email || 'user@example.com'}</p>
                    </div>
                    <button onClick={() => navigate('/profile')} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition">
                      <Settings className="w-4 h-4" />
                      Pengaturan Akun
                    </button>
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
