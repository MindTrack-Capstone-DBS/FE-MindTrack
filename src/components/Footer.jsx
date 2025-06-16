import React from 'react';
import { Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link

const Footer = () => {
  return (
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
            <Link to="/journal" className="text-blue-900 font-medium cursor-pointer hover:underline">Jurnal Harian</Link>
            <div className="text-blue-900 font-medium cursor-pointer hover:underline">Rekomendasi</div>
          </div>
          <div className="flex flex-col gap-2 min-w-[120px]">
            <div className="text-blue-900 font-bold mb-1">Bantuan</div>
            <Link to="/faq" className="text-blue-900 font-medium cursor-pointer hover:underline">FAQ</Link>
            <div className="text-blue-900 font-medium cursor-pointer hover:underline">Kontak</div>
            <Link to="/aboutUs" className="text-blue-900 font-medium cursor-pointer hover:underline">About Us</Link>
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
  );
};

export default Footer;
