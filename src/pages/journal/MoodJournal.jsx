import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, NotebookPen, BookText } from 'lucide-react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const MoodJournal = () => {
  const [isJournalMenuOpen, setIsJournalMenuOpen] = useState(false);
  const [journalContent, setJournalContent] = useState('');
  const [journalTitle, setJournalTitle] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moods = [
    { emoji: '😡', value: 1, color: 'bg-red-500' },
    { emoji: '😕', value: 2, color: 'bg-orange-400' },
    { emoji: '😐', value: 3, color: 'bg-yellow-300' },
    { emoji: '🙂', value: 4, color: 'bg-lime-500' },
    { emoji: '😊', value: 5, color: 'bg-green-600' },
  ];

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
        mood_emoji: moods[selectedMood].emoji,
        mood_value: moods[selectedMood].value,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/journals`, {
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
    <div className="top-20 min-h-screen bg-gray-50 flex flex-col relative">
      <div className="flex flex-1">
        {/* Sidebar - fixed, non-scrollable */}
        <Navbar/>

        {/* Main Content */}
        <main className="flex-1 p-10 flex flex-col gap-6">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-500 text-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Daily Journal Entry</h2>
            <p className="text-sm mt-1 opacity-90">Take a moment to reflect your thoughts and feelings from today</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-4">
              <input type="text" placeholder="Journal Title (optional)" value={journalTitle} onChange={(e) => setJournalTitle(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700">How are you feeling today? What's on your mind?</h3>
              <textarea
                placeholder="Start writing about your day, your thoughts, emotions, challenges..."
                value={journalContent}
                onChange={(e) => setJournalContent(e.target.value)}
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
                  {moods.map((mood, index) => (
                    <button
                      key={index}
                      onClick={() => handleMoodSelect(index)}
                      className={`${mood.color} text-2xl rounded-full w-12 h-12 flex items-center justify-center hover:brightness-110 transition ${selectedMood === index ? 'ring-4 ring-blue-400' : ''}`}
                    >
                      {mood.emoji}
                    </button>
                  ))}
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

      <div className="absolute bottom-80 right-10 z-50 w-full max-w-xs">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`h-12 w-full bg-blue-900 text-white py-3 px-4 rounded-xl shadow-lg hover:brightness-110 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Saving...' : 'Save Entry'}
        </button>
      </div>
      

      <Footer />
    </div>
  );
};

export default MoodJournal;
