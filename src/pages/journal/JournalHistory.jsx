import React, { useState } from 'react';
import { ChevronDown, ChevronUp, NotebookPen, BookText } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

// Contoh entri jurnal
const journalEntries = [
  {
    date: '2025-06-07',
    mood: '😊',
    title: 'Refleksi Besok Cerah',
    content: `Hari ini aku berjalan di taman dan merasakan udara pagi yang sejuk. Aku mencatat bagaimana pikiranku lebih tenang setelah mendengarkan burung berkicau. Namun, ada kekhawatiran kecil tentang deadline pekerjaan yang mendekat. Aku bertekad untuk membuat jadwal kerja dan memberikan waktunya.`,
  },
  {
    date: '2025-06-05',
    mood: '😐',
    title: 'Hari Biasa',
    content: `Pagi ini aku merasa sedikit lesu. Bangun lebih lambat dari biasanya dan sarapan sambil setengah sadar. Aku mencoba menyelesaikan tugas rutin kantor dan berhasil, tapi tanpa semangat yang besar. Mungkin aku butuh istirahat lebih. Nanti aku akan coba meditasi selama 10 menit.`,
  },
];

const JournalHistory = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="top-20 min-h-screen bg-gray-50 flex flex-col relative">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 p-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-gradient-to-r from-blue-900 to-indigo-500 text-white p-6 rounded-xl shadow mb-8">
            <h2 className="text-2xl font-bold">Journal History</h2>
            <p className="text-sm mt-1 opacity-90">Baca kembali tulisan harianmu dengan cara yang menarik dan interaktif.</p>
          </motion.div>

          <div className="space-y-6">
            {journalEntries.map((entry, idx) => {
              const isOpen = idx === openIndex;
              return (
                <motion.div key={idx} layout initial={{ borderRadius: 12 }} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <motion.button layout onClick={() => setOpenIndex(isOpen ? null : idx)} className="flex justify-between items-center w-full p-4">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{entry.mood}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{entry.title}</h3>
                        <span className="text-sm text-gray-500">{entry.date}</span>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </motion.button>

                  <motion.div layout animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }} initial={false} transition={{ duration: 0.4 }} className="bg-gray-50 p-4 border-t">
                    {isOpen && (
                      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
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

      <Footer />
    </div>
  );
};

export default JournalHistory;
