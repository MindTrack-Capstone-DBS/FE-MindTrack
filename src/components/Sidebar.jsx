import React, { useState } from 'react';
import { BookOpen, Home, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/Logo-cropped.png';

const Sidebar = () => {
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const location = useLocation(); // Get the current URL location

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

  return (
    <aside className="w-64 bg-white border-r border-blue-50 flex flex-col items-center py-6 px-4 gap-4 shadow-sm h-screen sticky top-0 overflow-hidden">
      {/* Logo */}
      <div className="mb-6">
        <img src={logo} alt="MindTrack Logo" className="h-12 w-auto" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 w-full overflow-hidden mt-4">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition ${
            isActive('/dashboard') ? 'bg-blue-900 text-white' : 'text-blue-900 hover:bg-blue-50'
          }`}
        >
          <Home className="w-5 h-5" /> Dashboard
        </Link>

        {/* Jurnal Harian with Dropdown */}
        <div className="flex flex-col w-full">
          <button
            onClick={toggleJournal}
            className={`flex items-center justify-between w-full gap-3 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition ${
              isJournalOpen || isJournalEntryActive() || isJournalHistoryActive()
                ? 'text-white bg-blue-900'
                : 'text-blue-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5" /> Jurnal Harian
            </div>
            {isJournalOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isJournalOpen && (
            <div className="flex flex-col gap-1 mt-1">
              <Link
                to="/journal"
                className={`flex items-center gap-3 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition text-sm ${
                  isJournalEntryActive() ? 'bg-blue-900 text-white' : 'text-blue-900'
                }`}
              >
                Masukan Jurnal Harian
              </Link>
              <Link
                to="/journal/history"
                className={`flex items-center gap-3 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition text-sm ${
                  isJournalHistoryActive() ? 'bg-blue-900 text-white' : 'text-blue-900'
                }`}
              >
                Riwayat Jurnal Harian
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/chat"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition ${
            isActive('/chat') ? 'bg-blue-900 text-white' : 'text-blue-900 hover:bg-blue-50'
          }`}
        >
          <MessageSquare className="w-5 h-5" /> Chatbox
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
