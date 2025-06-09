import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  NotebookPen,
  BookText
} from "lucide-react";
import Footer from '../../components/Footer';

const MoodJournal = () => {
const [isJournalMenuOpen, setIsJournalMenuOpen] = useState(false);

return (
<div className="min-h-screen bg-gray-50 flex flex-col relative">
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

        {/* Journal Dropdown */}
        <div>
            <button
            onClick={() => setIsJournalMenuOpen(!isJournalMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-blue-600 text-white transition"
            >
            <div className="flex items-center gap-2">
                <NotebookPen className="w-5 h-5" />
                <span>Journal</span>
            </div>
            {isJournalMenuOpen ? (
                <ChevronUp className="w-4 h-4" />
            ) : (
                <ChevronDown className="w-4 h-4" />
            )}
            </button>

            {isJournalMenuOpen && (
            <div className="mt-2 ml-6 flex flex-col gap-2 text-sm text-blue-900">
                <a
                href="/journal"
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-blue-100 transition"
                >
                <NotebookPen className="w-4 h-4" />
                Journal Entry
                </a>
                <a
                href="/journal/history"
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-blue-100 transition"
                >
                <BookText className="w-4 h-4" />
                Riwayat Jurnal
                </a>
            </div>
            )}
        </div>
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
    <div className="absolute bottom-90 right-6 z-50">
    <button
        onClick={() => alert("Pressed!")}
        className="bg-blue-900 w-85 text-white py-3 px-8 rounded-xl shadow-lg hover:brightness-110 transition"
    >
        Save Entry
    </button>
    </div>

    <Footer />
</div>
);
};

export default MoodJournal;
