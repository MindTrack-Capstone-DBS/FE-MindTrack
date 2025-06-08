import React from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const MoodJournal = () => {
return (
<div className="min-h-screen bg-gray-50 flex flex-col relative">
    {/* Main Content Area */}
    <div className="flex flex-1">
    {/* Sidebar */}
    <aside className="w-64 bg-white shadow-lg p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3">
        <img
            src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/uz2qkAlQfq/xvqa2q92_expires_30_days.png"
            alt="MindTrack Logo"
            className="w-45 h-25"
        />
        </div>
        <nav className="flex flex-col gap-4 text-gray-800 font-semibold">
        <a href="/landing" className="hover:text-blue-600 flex items-center gap-2">
            <span className="text-lg">🕒</span>
            Dashboard
        </a>
        <a href="/chat" className="hover:text-blue-600 flex items-center gap-2">
            <span className="text-lg">💬</span>
            Chatbox
        </a>
        <a
            href="/journal"
            className="bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
        >
            <span className="text-lg">📓</span>
            Journal
        </a>
        </nav>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-10 flex flex-col gap-6">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-500 text-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold">Daily Journal Entry</h2>
        <p className="text-sm mt-1 opacity-90">
            Take a moment to reflect your thoughts and feelings from today
        </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-700">
            How are you feeling today? What's on your mind?
            </h3>
            <textarea
            placeholder="Start writing about your day, your thoughts, emotions, challenges..."
            className="w-full h-[600px] border border-gray-300 rounded-lg p-4 resize-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
            {/* Mood Rating */}
            <section className="bg-white p-6 rounded-xl shadow-md">
            <h4 className="text-lg font-semibold text-gray-800">Rate Your Mood</h4>
            <p className="text-sm text-gray-600 mt-1">How would you rate your overall mood today?</p>
            <div className="flex justify-between items-center mt-4">
                {["😡", "😕", "😐", "🙂", "😊"].map((emoji, index) => {
                const colors = ["bg-red-500", "bg-orange-400", "bg-yellow-300", "bg-lime-500", "bg-green-600"];
                return (
                    <button
                    key={index}
                    onClick={() => alert("Pressed!")}
                    className={`${colors[index]} text-2xl rounded-full w-12 h-12 flex items-center justify-center hover:brightness-110 transition`}
                    >
                    {emoji}
                    </button>
                );
                })}
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Very Low</span>
                <span>Very High</span>
            </div>
            </section>

            {/* Writing Tips */}
            <section className="bg-white p-6 rounded-xl shadow-md text-sm text-gray-700 leading-relaxed">
            <h4 className="text-lg font-semibold mb-2">Writing Tips</h4>
            <ul className="list-disc list-inside space-y-1">
                <li>Write freely without worrying about grammar</li>
                <li>Include both positive and challenging moments</li>
                <li>Describe specific events and how they made you feel</li>
                <li>Note any physical sensations or symptoms</li>
                <li>Mention sleep, exercise, and eating patterns</li>
            </ul>
            </section>
        </div>
        </div>
    </main>
    </div>

    {/* Save Button - Fixed at bottom right */}
    <div className="fixed bottom-6 right-6 z-50">
    <button
        onClick={() => alert("Pressed!")}
        className="bg-blue-900 text-white py-3 px-8 rounded-xl shadow-lg hover:brightness-110 transition"
    >
        Save Entry
    </button>
    </div>

    {/* Footer */}
    <footer className="bg-[#f5f7fa] pt-10 pb-6 border-t border-[#e6edfa] w-full rounded-t-3xl shadow-[0_-2px_16px_rgba(33,56,144,0.06)] relative mt-10">
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

export default MoodJournal;
