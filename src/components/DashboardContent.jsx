import React, { useState, useEffect } from 'react';
import { Clock, Timer, BarChart2, Check } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Lottie from 'lottie-react';
import mentalHealthAnim from '../assets/images/mental-health.json';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardContent = ({ userData, dashboardData }) => {
  const [moodViewType, setMoodViewType] = useState('month');
  const [journalEntries, setJournalEntries] = useState([]);
  const [journalStats, setJournalStats] = useState({
    totalEntries: 0,
    thisMonthEntries: 0,
    weeklyGrowth: 0,
  });
  const [moodData, setMoodData] = useState({
    daily: [],
    monthly: [],
  });

  // State untuk recommendations dari chat AI
  const [recommendations, setRecommendations] = useState([]);
  const [completedActivities, setCompletedActivities] = useState([]);

  // Load completed activities dari localStorage saat component mount
  useEffect(() => {
    const savedCompletedActivities = localStorage.getItem('completedActivities');
    if (savedCompletedActivities) {
      try {
        setCompletedActivities(JSON.parse(savedCompletedActivities));
      } catch (error) {
        console.error('Error parsing completed activities:', error);
      }
    }
  }, []);

  // Save completed activities ke localStorage setiap kali berubah
  useEffect(() => {
    if (completedActivities.length > 0) {
      localStorage.setItem('completedActivities', JSON.stringify(completedActivities));
    }
  }, [completedActivities]);

  // Mark recommendation as completed
  const markAsCompleted = (recommendation, index) => {
    const newCompletedActivity = {
      id: Date.now(),
      text: recommendation,
      completedAt: new Date().toISOString(),
    };

    // Pindahkan dari recommendations ke completedActivities
    setCompletedActivities((prev) => {
      const updated = [...prev, newCompletedActivity];
      // Simpan ke localStorage
      localStorage.setItem('completedActivities', JSON.stringify(updated));
      return updated;
    });

    // Hapus dari recommendations
    setRecommendations((prev) => prev.filter((_, i) => i !== index));
  };

  // Fungsi untuk menghapus completed activity (opsional)
  const removeCompletedActivity = (activityId) => {
    setCompletedActivities((prev) => {
      const updated = prev.filter((activity) => activity.id !== activityId);
      localStorage.setItem('completedActivities', JSON.stringify(updated));
      return updated;
    });
  };

  // Fungsi untuk clear semua completed activities (opsional)
  const clearAllCompletedActivities = () => {
    setCompletedActivities([]);
    localStorage.removeItem('completedActivities');
  };

  // Fetch recommendations dari chat AI
  const fetchChatRecommendations = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`http://localhost:5000/api/chats/latest-recommendations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.recommendations && data.recommendations.length > 0) {
          setRecommendations(data.recommendations.slice(0, 5));
        }
      }
    } catch (error) {
      console.error('Error fetching chat recommendations:', error);
    }
  };

  // Fetch journal data
  useEffect(() => {
    const fetchJournalData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/journals`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const entries = data.journals || [];
          setJournalEntries(entries);

          // Calculate journal statistics
          const now = new Date();
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();
          const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

          const thisMonthEntries = entries.filter((entry) => {
            const entryDate = new Date(entry.created_at);
            return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
          }).length;

          const lastWeekEntries = entries.filter((entry) => {
            const entryDate = new Date(entry.created_at);
            return entryDate >= lastWeek;
          }).length;

          const previousWeekEntries = entries.filter((entry) => {
            const entryDate = new Date(entry.created_at);
            return entryDate >= twoWeeksAgo && entryDate < lastWeek;
          }).length;

          const weeklyGrowth = previousWeekEntries > 0 ? Math.round(((lastWeekEntries - previousWeekEntries) / previousWeekEntries) * 100) : lastWeekEntries > 0 ? 100 : 0;

          setJournalStats({
            totalEntries: entries.length,
            thisMonthEntries,
            weeklyGrowth,
          });

          // Process mood data for charts
          processMoodData(entries);
        }
      } catch (error) {
        console.error('Error fetching journal data:', error);
      }
    };

    fetchJournalData();
    fetchChatRecommendations(); // Fetch recommendations saat component mount
  }, []);

  // Process mood data for charts
  const processMoodData = (entries) => {
    const now = new Date();

    // Daily mood data (last 7 days)
    const dailyMoodData = [];
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayEntries = entries.filter((entry) => {
        const entryDate = new Date(entry.created_at);
        return entryDate.toDateString() === date.toDateString();
      });

      const avgMood = dayEntries.length > 0 ? dayEntries.reduce((sum, entry) => sum + entry.mood_value, 0) / dayEntries.length : 0;

      dailyMoodData.push({
        day: dayNames[date.getDay()],
        value: Math.round(avgMood * 10) / 10,
      });
    }

    // Monthly mood data (last 6 months)
    const monthlyMoodData = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEntries = entries.filter((entry) => {
        const entryDate = new Date(entry.created_at);
        return entryDate.getMonth() === date.getMonth() && entryDate.getFullYear() === date.getFullYear();
      });

      const avgMood = monthEntries.length > 0 ? monthEntries.reduce((sum, entry) => sum + entry.mood_value, 0) / monthEntries.length : 0;

      monthlyMoodData.push({
        month: monthNames[date.getMonth()],
        value: Math.round(avgMood * 10) / 10,
      });
    }

    setMoodData({
      daily: dailyMoodData,
      monthly: monthlyMoodData,
    });
  };

  const monthlyChartData = {
    labels: moodData.monthly.map((item) => item.month),
    datasets: [
      {
        label: 'Mood Level',
        data: moodData.monthly.map((item) => item.value),
        backgroundColor: moodData.monthly.map((item) => (item.value >= 4 ? 'rgba(20, 184, 166, 0.8)' : 'rgba(209, 213, 219, 0.8)')),
        borderColor: moodData.monthly.map((item) => (item.value >= 4 ? 'rgb(13, 148, 136)' : 'rgb(156, 163, 175)')),
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const dailyChartData = {
    labels: moodData.daily.map((item) => item.day),
    datasets: [
      {
        label: 'Mood Level',
        data: moodData.daily.map((item) => item.value),
        backgroundColor: moodData.daily.map((item) => (item.value >= 4 ? 'rgba(20, 184, 166, 0.8)' : 'rgba(96, 165, 250, 0.8)')),
        borderColor: moodData.daily.map((item) => (item.value >= 4 ? 'rgb(13, 148, 136)' : 'rgb(59, 130, 246)')),
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
  };

  return (
    <div className="px-6 lg:px-24 py-10 w-full max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Journal Entries */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between min-h-[180px]">
          <h2 className="text-base font-semibold text-gray-700">Journal Entries</h2>
          <p className="text-4xl font-bold text-blue-700">{journalStats.thisMonthEntries}</p>
          <p className="text-sm text-gray-500">This month</p>
          <p className={`text-sm font-medium ${journalStats.weeklyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {journalStats.weeklyGrowth >= 0 ? '+' : ''}
            {journalStats.weeklyGrowth}% from last week
          </p>
        </div>

        {/* Completed Activities */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between min-h-[180px]">
          <h2 className="text-base font-semibold text-gray-700">Completed Activities</h2>
          <p className="text-4xl font-bold text-pink-700">{completedActivities.length}</p>
          <p className="text-sm text-gray-500">Recommended actions</p>
          {completedActivities.length > 0 && (
            <div className="mt-2 max-h-16 overflow-y-auto">
              {completedActivities.slice(-2).map((activity, index) => (
                <p key={index} className="text-xs text-gray-600 truncate">
                  ✓ {activity.text}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Treatment Suggestions */}
        <div className="bg-white rounded-2xl shadow-md p-6 min-h-[180px]">
          <h3 className="text-base font-semibold text-gray-700 mb-4">Treatment Suggestions</h3>
          {recommendations.length > 0 ? (
            <ul className="space-y-3 text-sm text-gray-700">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex justify-between items-center group">
                  <span className="flex-1 pr-2">• {recommendation}</span>
                  <button onClick={() => markAsCompleted(recommendation, index)} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-full hover:bg-green-100 text-green-600" title="Mark as completed">
                    <Check className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p className="text-sm">No recommendations yet</p>
              <p className="text-xs mt-1">Chat with MindTrack AI to get personalized suggestions</p>
            </div>
          )}
        </div>
      </div>

      {/* Mood & Consultation Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mood Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6 w-full min-h-[360px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <BarChart2 className="w-5 h-5" />
              Mood Overview ({moodViewType === 'month' ? 'Monthly' : 'Daily'})
            </h2>
            <div className="flex gap-2">
              <button onClick={() => setMoodViewType('day')} className={`text-sm px-3 py-1 rounded-full border ${moodViewType === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                Daily
              </button>
              <button onClick={() => setMoodViewType('month')} className={`text-sm px-3 py-1 rounded-full border ${moodViewType === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                Monthly
              </button>
            </div>
          </div>
          <div className="h-[240px]">
            <Bar data={moodViewType === 'day' ? dailyChartData : monthlyChartData} options={chartOptions} />
          </div>
        </div>

        {/* Consultation Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 w-full min-h-[360px]">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Need Direct Consultation?</h2>
          <p className="text-sm text-gray-600 mb-4">If you need to speak directly with a mental health professional, feel free to contact one of our trusted partners.</p>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>
              <span className="font-medium">Dr. Nina Kusuma</span> – Clinical Psychologist <br />
              <span className="text-gray-500">
                Phone:{' '}
                <a href="tel:+6281234567890" className="text-blue-600 hover:underline">
                  +62 812 3456 7890
                </a>
              </span>
            </li>
            <li>
              <span className="font-medium">MindTracks Center</span> – Support Services <br />
              <span className="text-gray-500">
                Email:{' '}
                <a href="mailto:care@mindcare.id" className="text-blue-600 hover:underline">
                  care@mindtracks.id
                </a>
              </span>
            </li>
            <li>
              <span className="font-medium">Hotline Sehat Jiwa</span>
              <br />
              <span className="text-gray-500">
                Call:{' '}
                <a href="tel:119" className="text-blue-600 hover:underline">
                  119 (ext 8)
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <Lottie animationData={mentalHealthAnim} loop={true} className="absolute max-w-[250px] w-full right-60 bottom-3" />
    </div>
  );
};

export default DashboardContent;
