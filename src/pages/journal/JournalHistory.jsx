import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, NotebookPen, BookText } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const JournalHistory = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [journalEntries, setJournalEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
    

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/journals`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch journal entries');
        }

        const data = await response.json();
        setJournalEntries(data.journals || []); // Pastikan mengakses data.journals karena API mengembalikan { message, journals }
      } catch (error) {
        console.error('Error fetching journals:', error);
        setError('Failed to load journal entries. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJournals();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="top-20 min-h-screen bg-gray-50 flex flex-col relative">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Navbar userData={userData} />

        {/* Main Content */}
        <main className="flex-1 p-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-gradient-to-r from-blue-900 to-indigo-500 text-white p-6 rounded-xl shadow mb-8">
            <h2 className="text-2xl font-bold">Journal History</h2>
            <p className="text-sm mt-1 opacity-90">Baca kembali tulisan harianmu dengan cara yang menarik dan interaktif.</p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>
          ) : journalEntries.length === 0 ? (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-8 rounded-lg text-center">
              <p className="text-lg font-medium">No journal entries yet</p>
              <p className="mt-2">Start writing your thoughts and feelings to see them here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {journalEntries.map((entry, idx) => {
                const isOpen = idx === openIndex;
                return (
                  <motion.div key={entry.id} layout initial={{ borderRadius: 12 }} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <motion.button layout onClick={() => setOpenIndex(isOpen ? null : idx)} className="flex justify-between items-center w-full p-4">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{entry.mood_emoji}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{entry.title}</h3>
                          <span className="text-sm text-gray-500">{formatDate(entry.created_at)}</span>
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
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default JournalHistory;
