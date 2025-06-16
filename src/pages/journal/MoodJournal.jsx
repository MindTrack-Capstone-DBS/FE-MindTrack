import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const MoodJournal = () => {
  const [journalContent, setJournalContent] = useState('');
  const [journalTitle, setJournalTitle] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState({ name: 'User' });
  const navigate = useNavigate();

  const moods = [
    { emoji: '😡', value: 1, color: 'bg-red-500', label: 'Very Low' },
    { emoji: '😕', value: 2, color: 'bg-orange-400', label: 'Low' },
    { emoji: '😐', value: 3, color: 'bg-yellow-300', label: 'Neutral' },
    { emoji: '🙂', value: 4, color: 'bg-lime-500', label: 'Good' },
    { emoji: '😊', value: 5, color: 'bg-green-600', label: 'Very High' },
  ];

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

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!journalContent.trim() || selectedMood === null) {
      alert('Please write something and select your mood');
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData || !userData.id) {
        alert('You need to be logged in to save a journal entry');
        return;
      }

      const journalData = {
        user_id: userData.id,
        title: journalTitle.trim() || 'Journal Entry',
        content: journalContent,
        mood_emoji: selectedMood.emoji,
        mood_value: selectedMood.value,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://mindtrack-be-production-8ea6.up.railway.app'}/api/journals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(journalData),
      });

      if (!response.ok) {
        throw new Error('Failed to save journal entry');
      }

      alert('Journal entry saved successfully!');
      setJournalContent('');
      setJournalTitle('');
      setSelectedMood(null);
    } catch (error) {
      console.error('Error saving journal:', error);
      alert('Failed to save journal entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar userData={userData} />

      <main className="flex-1 pt-24 pb-10">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-500 text-white p-6 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-2">Daily Journal Entry</h1>
            <p className="text-sm opacity-90">Take a moment to reflect your thoughts and feelings from today</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Journal Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6">
                <form onSubmit={handleSubmit}>
                  {/* Journal Title */}
                  <div className="mb-9">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Journal Title (optional)</label>
                    <input
                      type="text"
                      value={journalTitle}
                      onChange={(e) => setJournalTitle(e.target.value)}
                      placeholder="Give your entry a title..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>

                  {/* Main Question */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">How are you feeling today? What's on your mind?</h2>
                    <textarea
                      value={journalContent}
                      onChange={(e) => setJournalContent(e.target.value)}
                      placeholder="Start writing about your day, your thoughts, emotions, challenges..."
                      rows={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button type="submit" disabled={isSubmitting} className={`bg-blue-900 text-white py-3 px-12 rounded-lg font-semibold hover:bg-blue-800 transition min-w-[200px] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                      {isSubmitting ? 'Saving...' : 'Save Entry'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Rate Your Mood */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Rate Your Mood</h3>
                <p className="text-sm text-gray-600 mb-4">How would you rate your overall mood today?</p>

                {/* Horizontal Mood Layout */}
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      type="button"
                      onClick={() => handleMoodSelect(mood)}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 transition hover:scale-105 ${selectedMood?.value === mood.value ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <span className="text-2xl mb-1">{mood.emoji}</span>
                    </button>
                  ))}
                </div>

                {/* Selected Mood Label */}
                {selectedMood && (
                  <div className="text-center">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{selectedMood.label}</span>
                  </div>
                )}
              </div>

              {/* Writing Tips */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Writing Tips</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Write freely without worrying about grammar
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Include both positive and challenging moments
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Describe specific events and how they made you feel
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Note any physical sensations or emotions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    Reflect on sleep, exercise, and eating patterns
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MoodJournal;
