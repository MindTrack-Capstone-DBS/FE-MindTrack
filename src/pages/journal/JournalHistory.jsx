import React, { useState } from "react";
import {
Facebook,
Instagram,
Linkedin,
Youtube,
ChevronDown,
ChevronUp,
NotebookPen,
BookText
} from "lucide-react";
import { motion } from "framer-motion";

// Contoh entri jurnal
const journalEntries = [
{
date: "2025-06-07",
mood: "😊",
title: "Refleksi Besok Cerah",
content: `Hari ini aku berjalan di taman dan merasakan udara pagi yang sejuk. Aku mencatat bagaimana pikiranku lebih tenang setelah mendengarkan burung berkicau. Namun, ada kekhawatiran kecil tentang deadline pekerjaan yang mendekat. Aku bertekad untuk membuat jadwal kerja dan memberikan waktunya.`,
},
{
date: "2025-06-05",
mood: "😐",
title: "Hari Biasa",
content: `Pagi ini aku merasa sedikit lesu. Bangun lebih lambat dari biasanya dan sarapan sambil setengah sadar. Aku mencoba menyelesaikan tugas rutin kantor dan berhasil, tapi tanpa semangat yang besar. Mungkin aku butuh istirahat lebih. Nanti aku akan coba meditasi selama 10 menit.`,
},
];

const JournalHistory = () => {
const [openIndex, setOpenIndex] = useState(null);
const [isJournalMenuOpen, setIsJournalMenuOpen] = useState(false); // ✅ ditambahkan di sini

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
    <main className="flex-1 p-10">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-900 to-indigo-500 text-white p-6 rounded-xl shadow mb-8"
        >
        <h2 className="text-2xl font-bold">Journal History</h2>
        <p className="text-sm mt-1 opacity-90">
            Baca kembali tulisan harianmu dengan cara yang menarik dan interaktif.
        </p>
        </motion.div>

        <div className="space-y-6">
        {journalEntries.map((entry, idx) => {
            const isOpen = idx === openIndex;
            return (
            <motion.div
                key={idx}
                layout
                initial={{ borderRadius: 12 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
            >
                <motion.button
                layout
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex justify-between items-center w-full p-4"
                >
                <div className="flex items-center gap-4">
                    <span className="text-2xl">{entry.mood}</span>
                    <div>
                    <h3 className="text-lg font-semibold text-gray-800">{entry.title}</h3>
                    <span className="text-sm text-gray-500">{entry.date}</span>
                    </div>
                </div>
                {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                </motion.button>

                <motion.div
                layout
                animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
                initial={false}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 p-4 border-t"
                >
                {isOpen && (
                    <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-700 text-sm whitespace-pre-line leading-relaxed"
                    >
                    {entry.content}
                    </motion.p>
                )}
                </motion.div>
            </motion.div>
            );
        })}
        </div>
    </main>
    </div>

    {/* Footer */}
    <footer className="bg-[#f5f7fa] pt-10 pb-6 border-t border-[#e6edfa] w-full rounded-t-3xl shadow-[0_-2px_16px_rgba(33,56,144,0.06)] relative mt-6">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-10 items-start">
        <div className="flex flex-col gap-2">
        <div className="text-xl text-blue-900 font-extrabold mb-2">MindTrack</div>
        <div className="text-blue-400">Track your mind, improve your life.</div>
        <div className="flex gap-4 mt-3">
            <a href="#"><Facebook size={28} /></a>
            <a href="#"><Linkedin size={28} /></a>
            <a href="#"><Youtube size={28} /></a>
            <a href="#"><Instagram size={28} /></a>
        </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
        <div>
            <div className="font-bold mb-1 text-blue-900">Fitur</div>
            <ul className="space-y-1 text-blue-900 text-sm">
            <li>Jurnal Harian</li>
            <li>Analisis Emosi</li>
            <li>Rekomendasi</li>
            </ul>
        </div>
        <div>
            <div className="font-bold mb-1 text-blue-900">Bantuan</div>
            <ul className="space-y-1 text-blue-900 text-sm">
            <li>FAQ</li>
            <li>Kontak</li>
            <li>Tentang Kami</li>
            </ul>
        </div>
        </div>
        <div className="flex flex-col gap-1 text-blue-900">
        <div className="font-bold">Hubungi Kami:</div>
        <div>support@mindtrack.com</div>
        <div>+62 812-3456-7890</div>
        </div>
    </div>
    <div className="text-center text-blue-400 text-sm mt-8 border-t border-[#e6edfa] pt-5">
        &copy; {new Date().getFullYear()} MindTrack.
    </div>
    </footer>
</div>
);
};

export default JournalHistory;
