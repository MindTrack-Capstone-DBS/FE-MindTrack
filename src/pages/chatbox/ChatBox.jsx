import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, MoreVertical, ExternalLink, Paperclip, Smile, Mic, Pencil, Trash2, ChevronDown } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import logo2 from '../../assets/images/Logo-cropped.png';

const ChatBox = () => {
  const [recentChats, setRecentChats] = useState([]);

  useEffect(() => {
    // Fetch recent chats from the database
    const fetchChats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/chats`);
        const data = await response.json();
        setRecentChats(data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="mt-20 min-h-screen bg-[#fafbfc] flex flex-col">
      {/* Navbar */}
      <Navbar variant="dark" />
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto mt-10 gap-6 px-4 md:px-8 pb-8 pt-4">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white rounded-[2.5rem] shadow-xl p-6 md:p-10 min-h-[600px] border border-blue-50">
          {/* Chat bubbles */}
          <div className="flex flex-col gap-8 mb-10 overflow-y-auto">
            {/* Chat messages will be dynamically rendered here */}
            {recentChats.map((chat, index) => (
              <div key={index} className={`flex items-start gap-3 ${chat.isBot ? '' : 'justify-end'}`}>
                <div className={`w-10 h-10 rounded-full ${chat.isBot ? 'bg-blue-100' : 'bg-blue-700'} flex items-center justify-center font-bold text-blue-900 text-base mt-1 shadow-sm`}>
                  {chat.isBot ? 'MT' : 'SL'}
                </div>
                <div className={`bg-${chat.isBot ? '[#f5f7fa]' : 'blue-700'} px-7 py-4 rounded-3xl ${chat.isBot ? 'rounded-tl-lg' : 'rounded-tr-lg'} text-gray-700 max-w-[70%] shadow transition-all duration-200 text-base`}>
                  {chat.message} <span className="text-xs text-gray-400 ml-2">{chat.time}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Message input */}
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
        {/* Sidebar */}
        <aside className="w-full md:w-[340px] flex-shrink-0 flex flex-col gap-6">
          {/* User Info Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col gap-4 items-center border border-blue-50 relative">
            <div className="relative mb-2">
              <img src={logo2} alt="Avatar" className="w-16 h-16 rounded-full object-cover border-2 border-blue-100" />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-900 text-lg">Yongky</div>
              <div className="text-xs text-gray-400">MindTrack Personal Assistant</div>
            </div>
            <MoreVertical className="text-gray-400 w-5 h-5 cursor-pointer absolute top-8 right-8" />
          </div>
          {/* Recent Chats Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex-1 flex flex-col gap-4 border border-blue-50">
            <div className="font-semibold text-blue-900 mb-2 text-base flex items-center gap-2 select-none">
              Recent Chats
              <ChevronDown className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex flex-col gap-1 overflow-y-auto max-h-[350px]">
              {recentChats.map((chat, idx) => (
                <div key={idx} className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition text-sm ${chat.active ? 'bg-blue-50 text-blue-900 font-bold shadow' : 'hover:bg-blue-50 hover:text-blue-900 text-gray-700'}`}>
                  <span className="truncate flex-1">{chat.title}</span>
                  <span className="text-xs text-gray-400">{chat.time}</span>
                  {chat.active ? (
                    <>
                      <button className="p-1 text-blue-400 hover:text-blue-700"><Pencil className="w-4 h-4" /></button>
                      <button className="p-1 text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      <button className="p-1 text-gray-400 hover:text-blue-700"><MoreVertical className="w-4 h-4" /></button>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
};

export default ChatBox;
