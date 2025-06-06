import React from 'react';
import { Link } from 'react-router-dom';
import { Send, MoreVertical, ExternalLink, UserCircle2, Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';
import Navbar from '../../components/Navbar';
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
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto mt-[96px] gap-6 px-4 pb-8">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-lg p-8 min-h-[600px]">
          {/* Chat bubbles */}
          <div className="flex flex-col gap-7 mb-8">
            {/* Bot message */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-900 text-base mt-1">MT</div>
              <div className="bg-[#f5f7fa] px-6 py-4 rounded-2xl rounded-tl-md text-gray-700 max-w-[70%] shadow-sm text-base">
                Hello! I'm your personal advisor <span className="text-xs text-gray-400 ml-2">10:25</span>
              </div>
            </div>
            {/* User message */}
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-blue-700 text-white px-6 py-4 rounded-2xl rounded-tr-md max-w-[70%] shadow text-base">
                I got my period, so i can't control my mood today <span className="text-xs text-blue-200 ml-2">11:25</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-900 text-base mt-1">SL</div>
            </div>
            {/* Bot message long */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-900 text-base mt-1">MT</div>
              <div className="bg-[#f5f7fa] px-6 py-4 rounded-2xl rounded-tl-md text-gray-700 max-w-[70%] shadow-sm text-base">
                I'm really sorry you're feeling this way. Periods can be physically and emotionally challenging, and it's totally okay to have off days. If there's anything I can do to help you feel better or just be here to talk, I'm here for you. Take it easy and be kind to yourself today <span className="ml-1">💛</span>
                <span className="block text-xs text-gray-400 mt-2">12:25</span>
              </div>
            </div>
            {/* Bot message with link */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-900 text-base mt-1">MT</div>
              <div className="bg-white px-0 py-0 rounded-2xl rounded-tl-md text-gray-700 max-w-[70%] shadow border border-blue-200">
                <div className="bg-blue-700 text-white px-6 py-2 rounded-t-2xl flex items-center justify-between">
                  <span className="font-semibold">External Link Title</span>
                  <ExternalLink className="w-5 h-5 ml-2" />
                </div>
                <div className="px-6 py-2 text-sm text-blue-100 bg-blue-700/80 rounded-b-2xl">External link description</div>
                <div className="px-6 py-2 text-blue-700 text-xs bg-blue-50 rounded-b-2xl border-t border-blue-200 flex items-center justify-between">
                  <a href="https://www.externallink.com" target="_blank" rel="noopener noreferrer" className="underline">https://www.externallink.com</a>
                  <span className="ml-2 text-gray-400">01:25</span>
                </div>
              </div>
            </div>
            {/* User message long */}
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-[#f5f7fa] px-6 py-4 rounded-2xl rounded-tr-md text-gray-700 max-w-[70%] shadow-sm text-base">
                Duis aute iure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br />
                <span className="block mt-2">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <span className="text-xs text-gray-400 ml-2">02:25</span></span>
              </div>
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-900 text-base mt-1">SL</div>
            </div>
          </div>
          {/* Message input */}
          <div className="mt-auto pt-4">
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm">
              <input type="text" placeholder="Message to Mindtrack..." className="flex-1 bg-transparent outline-none text-base text-gray-700" />
              <button className="text-blue-700 hover:text-blue-900 p-2 rounded-full transition"><Send className="w-6 h-6" /></button>
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <aside className="w-[340px] flex-shrink-0 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4 items-center">
            <UserCircle2 className="w-14 h-14 text-blue-900 mb-2" />
            <div className="text-center">
              <div className="font-semibold text-blue-900 text-lg">X_AE_A-13</div>
              <div className="text-xs text-gray-400">MindTrack Personal Assistant</div>
            </div>
            <MoreVertical className="text-gray-400 w-5 h-5 cursor-pointer absolute top-6 right-6" />
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex-1 flex flex-col gap-4">
            <div className="font-semibold text-blue-900 mb-2 text-base">Recent Chats</div>
            <div className="flex flex-col gap-1 overflow-y-auto max-h-[350px]">
              {recentChats.map((chat, idx) => (
                <div key={idx} className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition text-sm ${chat.active ? 'bg-blue-50 text-blue-900 font-bold' : 'hover:bg-gray-50 text-gray-700'}`}>
                  <span className="truncate flex-1">{chat.title}</span>
                  <span className="text-xs text-gray-400">{chat.time}</span>
                  {chat.active && <span className="ml-2 text-blue-400">|</span>}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
      <footer className="mt-auto bg-[#f5f7fa] pt-10 pb-6 border-t border-[#e6edfa] w-full rounded-t-3xl shadow-[0_-2px_16px_rgba(33,56,144,0.06)] relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-10 items-start">
          <div className="flex flex-col gap-2">
            <div className="text-xl text-blue-900 font-extrabold mb-2">MindTrack</div>
            <div className="text-blue-400 text-base mb-2">Track your mind, improve your life.</div>
            <div className="flex gap-4 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full bg-[#e6edfa] text-blue-900 hover:bg-[#1877f3] hover:text-white transition-all shadow hover:scale-110" title="Facebook">
                <Facebook size={28} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full bg-[#e6edfa] text-blue-900 hover:bg-[#0077b5] hover:text-white transition-all shadow hover:scale-110" title="LinkedIn">
                <Linkedin size={28} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full bg-[#e6edfa] text-blue-900 hover:bg-[#ff0000] hover:text-white transition-all shadow hover:scale-110" title="YouTube">
                <Youtube size={28} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full bg-[#e6edfa] text-blue-900 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-700 hover:text-white transition-all shadow hover:scale-110" title="Instagram">
                <Instagram size={28} />
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-center w-full">
            <div className="flex flex-col gap-2 min-w-[120px]">
              <div className="text-blue-900 font-bold mb-1">Fitur</div>
              <div className="text-blue-900 font-medium cursor-pointer hover:underline">Jurnal Harian</div>
              <div className="text-blue-900 font-medium cursor-pointer hover:underline">Analisis Emosi</div>
              <div className="text-blue-900 font-medium cursor-pointer hover:underline">Rekomendasi</div>
            </div>
            <div className="flex flex-col gap-2 min-w-[120px]">
              <div className="text-blue-900 font-bold mb-1">Bantuan</div>
              <div className="text-blue-900 font-medium cursor-pointer hover:underline">FAQ</div>
              <div className="text-blue-900 font-medium cursor-pointer hover:underline">Kontak</div>
              <div className="text-blue-900 font-medium cursor-pointer hover:underline">Tentang Kami</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-blue-900 font-medium">
            <div className="font-bold mb-1">Hubungi Kami:</div>
            <div>support@mindtrack.com</div>
            <div>+62 812-3456-7890</div>
          </div>
        </div>
        <div className="text-center text-blue-400 text-sm mt-8 border-t border-[#e6edfa] pt-5">
          &copy; {new Date().getFullYear()} MindTrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ChatBox; 