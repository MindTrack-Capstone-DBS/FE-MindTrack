import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, NotebookPen, BookText } from 'lucide-react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';


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
  <>
    {/* Submit button */}
    <div className="absolute bottom-80 right-10 z-50 w-full max-w-xs">
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`h-12 w-full bg-blue-900 text-white py-3 px-4 rounded-xl shadow-lg hover:brightness-110 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Saving...' : 'Save Entry'}
      </button>
    </div>

    {/* Mood Graphic */}
    <div className="px-10 mt-10">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Mood Progress Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={moodHistory}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    <Footer />
  </>
);
};

export default MoodJournal;
