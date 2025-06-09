import React from 'react';
import { BookOpen, Home, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/Logo-cropped.png';

const Sidebar = () => (
  <aside className="w-64 bg-white border-r border-blue-50 flex flex-col items-center py-6 px-4 gap-4 shadow-sm h-screen sticky top-0 overflow-hidden">
    {/* Logo */}
    <div className="mb-6">
      <img src={logo} alt="MindTrack Logo" className="h-12 w-auto" />
    </div>

    {/* Navigation */}
    <nav className="flex flex-col gap-2 w-full overflow-hidden mt-4">
      <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-900 text-white font-medium hover:bg-blue-800 transition">
        <Home className="w-5 h-5" /> Dashboard
      </Link>
      <Link to="/journal" className="flex items-center gap-3 px-4 py-2 rounded-lg text-blue-900 font-medium hover:bg-blue-50 transition">
        <BookOpen className="w-5 h-5" /> Jurnal Harian
      </Link>
      <Link to="/chat" className="flex items-center gap-3 px-4 py-2 rounded-lg text-blue-900 font-medium hover:bg-blue-50 transition">
        <MessageSquare className="w-5 h-5" /> Chatbox
      </Link>
    </nav>
  </aside>
);

export default Sidebar;
