import React from 'react';
import { Link } from 'react-router-dom';
import { Send, MoreVertical, ExternalLink, UserCircle2, Paperclip, Smile, Mic, Pencil, Trash2, ChevronDown } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import logo2 from '../../assets/images/Logo-cropped.png';

const recentChats = [
  { title: 'How to get fit without doing any exercise', time: '2m ago' },
  { title: `I got my period, so I can't t...`, time: '2m ago', active: true },
  { title: 'Compsci SICP Tutorial course', time: '2m ago' },
  { title: 'Proxy failure troubleshooting', time: '2m ago' },
  { title: 'Wake me up when september e...', time: '2m ago' },
  { title: 'Best Oasis songs top 100 of all...', time: '2m ago' },
  { title: 'Fix SSL/TLS Error', time: '2m ago' },
];

const ChatBox = () => {
  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col">
      {/* Navbar */}
      <Navbar variant="dark" />
      {/* Main Content */}
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto mt-40 gap-6 px-4 md:px-8 pb-8 pt-4">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white rounded-[2.5rem] shadow-xl p-10 min-h-[600px] border border-blue-50">
          {/* Chat bubbles */}
          <div className="flex flex-col gap-8 mb-10">
            {/* Bot message */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-900 text-base mt-1 shadow-sm">MT</div>
              <div className="bg-[#f5f7fa] px-7 py-4 rounded-3xl rounded-tl-lg text-gray-700 max-w-[70%] shadow transition-all duration-200 text-base">
                Hello! I'm your personal advisor <span className="text-xs text-gray-400 ml-2">10:25</span>
              </div>
            </div>
            {/* User message */}
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-blue-700 text-white px-7 py-4 rounded-3xl rounded-tr-lg max-w-[70%] shadow transition-all duration-200 text-base">
                I got my period, so i can't control my mood today <span className="text-xs text-blue-200 ml-2">11:25</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-900 text-base mt-1 shadow-sm">SL</div>
            </div>
            {/* Bot message long */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-900 text-base mt-1 shadow-sm">MT</div>
              <div className="bg-[#f5f7fa] px-7 py-4 rounded-3xl rounded-tl-lg text-gray-700 max-w-[70%] shadow transition-all duration-200 text-base">
                I'm really sorry you're feeling this way. Periods can be physically and emotionally challenging, and it's totally okay to have off days. If there's anything I can do to help you feel better or just be here to talk, I'm here for you. Take it easy and be kind to yourself today <span className="ml-1">💛</span>
                <span className="block text-xs text-gray-400 mt-2">12:25</span>
              </div>
            </div>
            {/* Bot message with link */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-900 text-base mt-1 shadow-sm">MT</div>
              <div className="bg-white px-0 py-0 rounded-3xl rounded-tl-lg text-gray-700 max-w-[70%] shadow-lg border border-blue-100">
                <div className="bg-blue-700 text-white px-7 py-2 rounded-t-3xl flex items-center justify-between">
                  <span className="font-semibold">External Link Title</span>
                  <ExternalLink className="w-5 h-5 ml-2" />
                </div>
                <div className="px-7 py-2 text-sm text-blue-100 bg-blue-700/80 rounded-b-3xl">External link description</div>
                <div className="px-7 py-2 text-blue-700 text-xs bg-blue-50 rounded-b-3xl border-t border-blue-100 flex items-center justify-between">
                  <a href="https://www.externallink.com" target="_blank" rel="noopener noreferrer" className="underline">https://www.externallink.com</a>
                  <span className="ml-2 text-gray-400">01:25</span>
                </div>
              </div>
            </div>
            {/* User message long */}
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-[#f5f7fa] px-7 py-4 rounded-3xl rounded-tr-lg text-gray-700 max-w-[70%] shadow transition-all duration-200 text-base">
                Duis aute iure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br />
                <span className="block mt-2">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <span className="text-xs text-gray-400 ml-2">02:25</span></span>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-900 text-base mt-1 shadow-sm">SL</div>
            </div>
          </div>
          {/* Message input */}
          <div className="mt-auto pt-4">
            <div className="flex items-center gap-3 bg-white border border-blue-100 rounded-2xl px-6 py-4 shadow transition-all duration-200 focus-within:shadow-lg">
              {/* Attachment icon */}
              <button className="text-gray-400 hover:text-blue-700 p-2 rounded-full transition mr-2">
                <Paperclip className="w-5 h-5" />
              </button>
              {/* Input */}
              <input type="text" placeholder="Message to Mindtrack..." className="flex-1 bg-transparent outline-none text-base text-gray-700" />
              {/* Emoji icon */}
              <button className="text-gray-400 hover:text-blue-700 p-2 rounded-full transition">
                <Smile className="w-5 h-5" />
              </button>
              {/* Mic icon */}
              <button className="text-gray-400 hover:text-blue-700 p-2 rounded-full transition">
                <Mic className="w-5 h-5" />
              </button>
              {/* Send button */}
              <button className="bg-[#6C63FF] hover:bg-[#5548c8] text-white px-6 py-2 rounded-full flex items-center gap-2 font-semibold text-base ml-2 transition shadow">
                Send <Send className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <aside className="w-[340px] flex-shrink-0 flex flex-col gap-6">
          {/* User Info Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col gap-4 items-center border border-blue-50 relative">
            {/* Avatar with online dot */}
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