import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo2 from '../assets/images/Logo-cropped.png';
import { ChevronDown, ChevronUp, Settings, LogOut, Menu, X } from 'lucide-react';

// Tambahkan import
import { useMentalStatus } from '../context/MentalStatusContext';

const Navbar = ({ variant = 'light', isLandingPage = false, userData, dashboardData }) => {
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleJournal = () => {
    setIsJournalOpen(!isJournalOpen);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const toggleMobileMenu = () => {
    console.log('Toggle mobile menu:', !isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsJournalOpen(false);
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
    closeMobileMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('completedActivities');
    navigate('/');
    window.location.reload();
  };

  const textColor = 'text-blue-900';
  const hoverColor = 'hover:text-blue-700';
  const bgColor = 'bg-white/60 backdrop-blur-lg shadow-sm transition-all duration-300';

  // Tambahkan hook untuk context
  const { mentalStatus } = useMentalStatus();

  // Fungsi untuk menentukan warna status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'depression':
        return 'bg-blue-600';
      case 'suicidal':
        return 'bg-red-600';
      case 'anxiety':
        return 'bg-yellow-500';
      case 'bipolar':
        return 'bg-purple-600';
      case 'stress':
        return 'bg-orange-500';
      case 'personality disorder':
        return 'bg-pink-600';
      default: // Normal
        return 'bg-green-500';
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-20 w-full ${bgColor}`}>
        <div className="h-20 max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-8 md:px-14 py-4 md:py-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo2} alt="MindTrack Logo" className="w-32 sm:w-40 max-w-full h-auto object-contain m-0 bg-none cursor-pointer" onClick={handleLogoClick} />
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center gap-9">
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
                  <button onClick={toggleJournal} className={`${textColor} font-semibold text-lg ${hoverColor} transition flex items-center gap-1 ${isJournalEntryActive() || isJournalHistoryActive() ? 'border-b-2 border-blue-900' : ''}`}>
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

          {/* Right Side - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            {isLandingPage ? (
              // Auth buttons untuk Landing Page
              <>
                <Link to="/login" className="bg-blue-900 text-white rounded-xl px-6 lg:px-8 py-3 font-semibold text-sm lg:text-base mr-2 hover:bg-blue-800 transition text-center">
                  Sign In
                </Link>
                <Link to="/register" className="bg-white text-blue-900 border-2 border-blue-900 rounded-xl px-6 lg:px-8 py-3 font-semibold text-sm lg:text-base hover:bg-blue-900 hover:text-white transition text-center">
                  Sign Up
                </Link>
              </>
            ) : (
              // Profile section untuk Dashboard
              <>
                {/* Status (Mental Health) */}
                <div className={`${getStatusColor(mentalStatus)} text-white px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-medium shadow-sm`}>{mentalStatus}</div>

                {/* Profile with Dropdown */}
                <div className="relative">
                  <button onClick={toggleProfileMenu} className="flex items-center gap-2 focus:outline-none hover:bg-blue-50 rounded-full p-1 transition-colors">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center text-white font-bold shadow-sm text-xs lg:text-sm">
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

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {!isLandingPage && (
              <div className="flex items-center gap-2">
                {/* Mobile Status */}
                <div className={`${getStatusColor(mentalStatus)} text-white px-2 py-1 rounded-full text-xs font-medium`}>{mentalStatus.length > 5 ? mentalStatus.substring(0, 5) + '...' : mentalStatus}</div>
              </div>
            )}

            <button onClick={toggleMobileMenu} className="p-2 rounded-lg hover:bg-blue-50 transition-colors">
              {isMobileMenuOpen ? <X className="w-6 h-6 text-blue-900" /> : <Menu className="w-6 h-6 text-blue-900" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[9999] flex">
          {/* Background Overlay */}
          <div className="flex-1 bg-black bg-opacity-50 transition-opacity duration-300" onClick={closeMobileMenu}></div>

          {/* Sidebar */}
          <div className={`w-80 bg-white h-full shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <img src={logo2} alt="MindTrack Logo" className="w-32 h-auto object-contain" />
              <button onClick={closeMobileMenu} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex flex-col h-full">
              {/* Navigation Menu */}
              <div className="flex-1 py-6">
                {isLandingPage ? (
                  // Landing Page Menu
                  <div className="space-y-2 px-4">
                    <Link to="/landing" onClick={closeMobileMenu} className="block px-4 py-3 text-blue-900 font-semibold text-lg hover:bg-blue-50 rounded-lg transition">
                      Beranda
                    </Link>

                    {/* Journal Section */}
                    <div>
                      <button onClick={toggleJournal} className="w-full flex items-center justify-between px-4 py-3 text-blue-900 font-semibold text-lg hover:bg-blue-50 rounded-lg transition">
                        Jurnal
                        {isJournalOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>

                      {isJournalOpen && (
                        <div className="ml-4 mt-2 space-y-1">
                          <Link to="/journal" onClick={closeMobileMenu} className={`block px-4 py-2 text-blue-800 hover:bg-blue-50 rounded-lg transition ${isJournalEntryActive() ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`}>
                            📝 Masukan Jurnal
                          </Link>
                          <Link to="/journal/history" onClick={closeMobileMenu} className={`block px-4 py-2 text-blue-800 hover:bg-blue-50 rounded-lg transition ${isJournalHistoryActive() ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`}>
                            📚 Riwayat Jurnal
                          </Link>
                        </div>
                      )}
                    </div>

                    <Link to="/chat" onClick={closeMobileMenu} className="block px-4 py-3 text-blue-900 font-semibold text-lg hover:bg-blue-50 rounded-lg transition">
                      ChatBox
                    </Link>
                  </div>
                ) : (
                  // Dashboard Menu
                  <div className="space-y-2 px-4">
                    <Link
                      to="/dashboard"
                      onClick={closeMobileMenu}
                      className={`block px-4 py-3 text-blue-900 font-semibold text-lg hover:bg-blue-50 rounded-lg transition ${isActive('/dashboard') ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`}
                    >
                      Beranda
                    </Link>

                    {/* Journal Section */}
                    <div>
                      <button
                        onClick={toggleJournal}
                        className={`w-full flex items-center justify-between px-4 py-3 text-blue-900 font-semibold text-lg hover:bg-blue-50 rounded-lg transition ${
                          isJournalEntryActive() || isJournalHistoryActive() ? 'bg-blue-100 border-l-4 border-blue-500' : ''
                        }`}
                      >
                        Jurnal
                        {isJournalOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>

                      {isJournalOpen && (
                        <div className="ml-4 mt-2 space-y-1">
                          <Link to="/journal" onClick={closeMobileMenu} className={`block px-4 py-2 text-blue-800 hover:bg-blue-50 rounded-lg transition ${isJournalEntryActive() ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`}>
                            📝 Masukan Jurnal
                          </Link>
                          <Link to="/journal/history" onClick={closeMobileMenu} className={`block px-4 py-2 text-blue-800 hover:bg-blue-50 rounded-lg transition ${isJournalHistoryActive() ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`}>
                            📚 Riwayat Jurnal
                          </Link>
                        </div>
                      )}
                    </div>

                    <Link to="/chat" onClick={closeMobileMenu} className={`block px-4 py-3 text-blue-900 font-semibold text-lg hover:bg-blue-50 rounded-lg transition ${isActive('/chat') ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`}>
                      ChatBox
                    </Link>
                  </div>
                )}
              </div>

              {/* Bottom Section */}
              <div className="border-t border-gray-200 p-4">
                {isLandingPage ? (
                  // Auth buttons untuk Landing Page
                  <div className="space-y-3">
                    <Link to="/login" onClick={closeMobileMenu} className="block w-full bg-blue-900 text-white rounded-xl px-6 py-3 font-semibold text-center hover:bg-blue-800 transition">
                      Sign In
                    </Link>
                    <Link to="/register" onClick={closeMobileMenu} className="block w-full bg-white text-blue-900 border-2 border-blue-900 rounded-xl px-6 py-3 font-semibold text-center hover:bg-blue-900 hover:text-white transition">
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  // Profile section untuk Dashboard
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                        {userData?.name
                          ? userData.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()
                              .substring(0, 2)
                          : 'U'}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{userData?.name || 'User'}</p>
                        <p className="text-xs text-gray-500">{userData?.email || 'user@example.com'}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          navigate('/profile');
                          closeMobileMenu();
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                      >
                        <Settings className="w-4 h-4" />
                        Pengaturan Akun
                      </button>
                      <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-lg transition">
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
