import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo2 from '../assets/images/Logo-cropped.png';
import { ChevronDown, ChevronUp, Bell, Settings, LogOut, Menu, X } from 'lucide-react';

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

  return (
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
              {/* Status (Anxiety) */}
              <div className="bg-teal-500 text-white px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-medium shadow-sm">
                {dashboardData?.stressLevel > 70 ? 'High Anxiety' : dashboardData?.stressLevel > 40 ? 'Moderate' : 'Low Anxiety'}
              </div>

              {/* Notification Icon */}
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-blue-50 transition-colors">
                  <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-blue-900" />
                  <span className="absolute top-1 right-1 w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
              </div>

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
              <div className="bg-teal-500 text-white px-2 py-1 rounded-full text-xs font-medium">{dashboardData?.stressLevel > 70 ? 'High' : dashboardData?.stressLevel > 40 ? 'Mod' : 'Low'}</div>

              {/* Mobile Notification */}
              <div className="relative">
                <button className="p-1.5 rounded-full hover:bg-blue-50 transition-colors">
                  <Bell className="w-5 h-5 text-blue-900" />
                  <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
              </div>
            </div>
          )}

          <button onClick={toggleMobileMenu} className="p-2 rounded-lg hover:bg-blue-50 transition-colors">
            {isMobileMenuOpen ? <X className="w-6 h-6 text-blue-900" /> : <Menu className="w-6 h-6 text-blue-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 overflow-y-auto">
          <div className="px-4 py-6 space-y-4">
            {isLandingPage ? (
              // Mobile Menu untuk Landing Page
              <>
                <Link to="/landing" className={`block py-3 px-4 rounded-lg ${textColor} font-semibold text-lg ${hoverColor} transition hover:bg-blue-50`} onClick={closeMobileMenu}>
                  Beranda
                </Link>

                {/* Mobile Journal Section */}
                <div className="space-y-2">
                  <button onClick={toggleJournal} className={`w-full flex items-center justify-between py-3 px-4 rounded-lg ${textColor} font-semibold text-lg ${hoverColor} transition hover:bg-blue-50`}>
                    Jurnal
                    {isJournalOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isJournalOpen && (
                    <div className="ml-4 space-y-2">
                      <Link to="/journal" className={`block py-2 px-4 rounded-lg text-blue-900 hover:bg-blue-50 transition text-base font-medium ${isJournalEntryActive() ? 'bg-blue-100' : ''}`} onClick={closeMobileMenu}>
                        📝 Masukan Jurnal
                      </Link>
                      <Link to="/journal/history" className={`block py-2 px-4 rounded-lg text-blue-900 hover:bg-blue-50 transition text-base font-medium ${isJournalHistoryActive() ? 'bg-blue-100' : ''}`} onClick={closeMobileMenu}>
                        📚 Riwayat Jurnal
                      </Link>
                    </div>
                  )}
                </div>

                <Link to="/chat" className={`block py-3 px-4 rounded-lg ${textColor} font-semibold text-lg ${hoverColor} transition hover:bg-blue-50`} onClick={closeMobileMenu}>
                  ChatBox
                </Link>

                {/* Mobile Auth Buttons */}
                <div className="pt-4 space-y-3">
                  <Link to="/login" className="block w-full bg-blue-900 text-white rounded-xl px-6 py-3 font-semibold text-base text-center hover:bg-blue-800 transition" onClick={closeMobileMenu}>
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full bg-white text-blue-900 border-2 border-blue-900 rounded-xl px-6 py-3 font-semibold text-base text-center hover:bg-blue-900 hover:text-white transition"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            ) : (
              // Mobile Menu untuk Dashboard
              <>
                <Link to="/dashboard" className={`block py-3 px-4 rounded-lg ${textColor} font-semibold text-lg ${hoverColor} transition hover:bg-blue-50 ${isActive('/dashboard') ? 'bg-blue-100' : ''}`} onClick={closeMobileMenu}>
                  Beranda
                </Link>

                {/* Mobile Journal Section */}
                <div className="space-y-2">
                  <button
                    onClick={toggleJournal}
                    className={`w-full flex items-center justify-between py-3 px-4 rounded-lg ${textColor} font-semibold text-lg ${hoverColor} transition hover:bg-blue-50 ${
                      isJournalEntryActive() || isJournalHistoryActive() ? 'bg-blue-100' : ''
                    }`}
                  >
                    Jurnal
                    {isJournalOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isJournalOpen && (
                    <div className="ml-4 space-y-2">
                      <Link to="/journal" className={`block py-2 px-4 rounded-lg text-blue-900 hover:bg-blue-50 transition text-base font-medium ${isJournalEntryActive() ? 'bg-blue-100' : ''}`} onClick={closeMobileMenu}>
                        📝 Masukan Jurnal
                      </Link>
                      <Link to="/journal/history" className={`block py-2 px-4 rounded-lg text-blue-900 hover:bg-blue-50 transition text-base font-medium ${isJournalHistoryActive() ? 'bg-blue-100' : ''}`} onClick={closeMobileMenu}>
                        📚 Riwayat Jurnal
                      </Link>
                    </div>
                  )}
                </div>

                <Link to="/chat" className={`block py-3 px-4 rounded-lg ${textColor} font-semibold text-lg ${hoverColor} transition hover:bg-blue-50 ${isActive('/chat') ? 'bg-blue-100' : ''}`} onClick={closeMobileMenu}>
                  ChatBox
                </Link>

                {/* Mobile Profile Section */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3 py-3 px-4">
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
                    <div>
                      <p className="text-sm font-medium text-gray-900">{userData?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{userData?.email || 'user@example.com'}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigate('/profile');
                      closeMobileMenu();
                    }}
                    className="flex items-center gap-3 w-full py-3 px-4 text-sm text-gray-700 hover:bg-gray-50 transition rounded-lg"
                  >
                    <Settings className="w-4 h-4" />
                    Pengaturan Akun
                  </button>

                  <button onClick={handleLogout} className="flex items-center gap-3 w-full py-3 px-4 text-sm text-red-500 hover:bg-red-50 transition rounded-lg">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
