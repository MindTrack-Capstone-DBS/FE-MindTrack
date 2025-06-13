import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Send, MoreVertical, ExternalLink, Paperclip, Smile, Mic, Pencil, Trash2, ChevronDown } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import logo2 from '../../assets/images/Logo-cropped.png';

const ChatBox = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: 'User',
  });

  // Mendapatkan data user dari localStorage saat komponen dimount
  useEffect(() => {
    // Cek apakah user sudah login
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, [navigate]);
  return (
    <div className="mt-20 min-h-screen bg-[#fafbfc] flex flex-col">
      {/* Navbar */}
      <Navbar variant="dark"  userData={userData} />
      {/* Main Content */}
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto mt-10 gap-6 px-4 md:px-8 pb-8 pt-4">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white rounded-[2.5rem] shadow-xl p-6 md:p-10 min-h-[600px] border border-blue-50">
          <div className="mt-4 mb-10 flex flex-col gap-8 overflow-y-auto">
          </div>
          <div className="mt-auto pt-4">
            <div className="flex items-center gap-3 bg-white border border-blue-100 rounded-2xl px-6 py-4 shadow transition-all duration-200 focus-within:shadow-lg">
              <button className="text-gray-400 hover:text-blue-700 p-2 rounded-full transition mr-2">
                <Paperclip className="w-5 h-5" />
              </button>
              <input type="text" placeholder="Message to Mindtrack..." className="flex-1 bg-transparent outline-none text-base text-gray-700" />
              <button className="text-gray-400 hover:text-blue-700 p-2 rounded-full transition">
                <Smile className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-blue-700 p-2 rounded-full transition">
                <Mic className="w-5 h-5" />
              </button>
              <button className="bg-[#6C63FF] hover:bg-[#5548c8] text-white px-6 py-2 rounded-full flex items-center gap-2 font-semibold text-base ml-2 transition shadow">
                Send <Send className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        </div>
        
        <aside className="w-full md:w-[340px] flex-shrink-0 flex flex-col gap-6">
          {/* User Info Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center text-white mb-2">
              {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="font-semibold text-blue-700 mb-1">{userData?.name || 'User'}</span>
            <span className="text-sm text-gray-500">MindTrack Personal Assistant</span>
          </div>
        </div>
          {/* Recent Chats Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex-1 flex flex-col gap-4 border border-blue-50">
            <div className="font-semibold text-blue-900 mb-2 text-base flex items-center gap-2 select-none">
              Recent Chats
              <ChevronDown className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex flex-col gap-1 overflow-y-auto max-h-[350px]">
            
            </div>
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
};

export default ChatBox;
