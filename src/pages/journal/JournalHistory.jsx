import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, NotebookPen, BookText, Trash2, Calendar, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const JournalHistory = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [journalEntries, setJournalEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
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
        setJournalEntries(data.journals || []);
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

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const handleDeleteJournal = async (journalId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/journals/${journalId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete journal entry');
      }

      // Remove the deleted entry from state
      setJournalEntries((prev) => prev.filter((entry) => entry.id !== journalId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting journal:', error);
      alert('Failed to delete journal entry. Please try again.');
    }
  };

  const getMoodColor = (emoji) => {
    const moodColors = {
      '😊': 'from-green-400 to-green-600',
      '😢': 'from-blue-400 to-blue-600',
      '😡': 'from-red-400 to-red-600',
      '😰': 'from-yellow-400 to-yellow-600',
      '😴': 'from-purple-400 to-purple-600',
      '🤔': 'from-gray-400 to-gray-600',
      '❤️': 'from-pink-400 to-pink-600',
      '😎': 'from-indigo-400 to-indigo-600',
    };
    return moodColors[emoji] || 'from-blue-400 to-blue-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col relative">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Navbar userData={userData} />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10 mt-20">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-900 via-indigo-600 to-purple-700 text-white p-8 rounded-2xl shadow-2xl mb-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <BookText className="w-8 h-8" />
                <h2 className="text-3xl font-bold">Journal History</h2>
              </div>
              <p className="text-lg opacity-90 max-w-2xl">Relive your thoughts and emotions through your personal journal entries. Track your mental health journey with beautiful, interactive cards.</p>
              <div className="flex items-center gap-6 mt-6 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{journalEntries.length} Total Entries</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>Your Mental Health Journey</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <NotebookPen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          ) : error ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-50 border-l-4 border-red-400 text-red-700 p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">!</span>
                </div>
                <div>
                  <h3 className="font-semibold">Error Loading Journals</h3>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </motion.div>
          ) : journalEntries.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-dashed border-blue-300 text-blue-700 p-12 rounded-2xl text-center shadow-lg">
              <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <NotebookPen className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">No Journal Entries Yet</h3>
              <p className="text-lg mb-6 max-w-md mx-auto">Start your mental health journey by writing your first journal entry. Share your thoughts, feelings, and daily experiences.</p>
              <button onClick={() => navigate('/journal')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
                Write Your First Entry
              </button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {journalEntries.map((entry, idx) => {
                const isOpen = idx === openIndex;
                const moodGradient = getMoodColor(entry.mood_emoji);

                return (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    {/* Journal Entry Header */}
                    <div className={`bg-gradient-to-r ${moodGradient} p-1`}>
                      <div className="bg-white rounded-xl">
                        <motion.button layout onClick={() => setOpenIndex(isOpen ? null : idx)} className="flex justify-between items-center w-full p-6 hover:bg-gray-50 transition-colors duration-200">
                          <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 bg-gradient-to-r ${moodGradient} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>{entry.mood_emoji}</div>
                            <div className="text-left">
                              <h3 className="text-xl font-bold text-gray-800 mb-1">{entry.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{formatDate(entry.created_at)}</span>
                                </div>
                                <span>•</span>
                                <span>{formatTime(entry.created_at)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Delete Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirm(entry.id);
                              }}
                              className="p-2 rounded-full hover:bg-red-100 text-red-500 transition-colors duration-200 group"
                              title="Delete journal entry"
                            >
                              <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>

                            {/* Expand/Collapse Button */}
                            <div className="p-2 rounded-full bg-gray-100">{isOpen ? <ChevronUp className="w-6 h-6 text-gray-600" /> : <ChevronDown className="w-6 h-6 text-gray-600" />}</div>
                          </div>
                        </motion.button>
                      </div>
                    </div>

                    {/* Journal Entry Content */}
                    <motion.div
                      layout
                      animate={{
                        opacity: isOpen ? 1 : 0,
                        height: isOpen ? 'auto' : 0,
                      }}
                      initial={false}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden"
                    >
                      {isOpen && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6">
                          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                              <NotebookPen className="w-5 h-5 text-blue-600" />
                              Journal Content
                            </h4>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">{entry.content}</p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Journal Entry</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this journal entry? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors duration-200">
                  Cancel
                </button>
                <button onClick={() => handleDeleteJournal(deleteConfirm)} className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors duration-200">
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
};

export default JournalHistory;
