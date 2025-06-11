import React, { useState } from 'react';
import { Clock, Timer, BarChart2 } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardContent = ({ userData, dashboardData }) => {
  const [moodViewType, setMoodViewType] = useState('month'); // 'month' or 'daily'

  // Data dummy untuk tampilan harian
  const dailyMood = [
    { day: 'Sen', value: 3.2 },
    { day: 'Sel', value: 2.8 },
    { day: 'Rab', value: 3.5 },
    { day: 'Kam', value: 4 },
    { day: 'Jum', value: 3.2 },
    { day: 'Sab', value: 2.5 },
    { day: 'Min', value: 3.0 },
  ];

  // Konfigurasi chart untuk tampilan bulanan
  const monthlyChartData = {
    labels: dashboardData.monthlyMood.map((item) => item.month),
    datasets: [
      {
        label: 'Mood Level',
        data: dashboardData.monthlyMood.map((item) => item.value),
        backgroundColor: dashboardData.monthlyMood.map((item) => (item.value === 4 ? 'rgba(20, 184, 166, 0.8)' : 'rgba(209, 213, 219, 0.8)')),
        borderColor: dashboardData.monthlyMood.map((item) => (item.value === 4 ? 'rgb(13, 148, 136)' : 'rgb(156, 163, 175)')),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  // Konfigurasi chart untuk tampilan harian
  const dailyChartData = {
    labels: dailyMood.map((item) => item.day),
    datasets: [
      {
        label: 'Mood Level',
        data: dailyMood.map((item) => item.value),
        backgroundColor: dailyMood.map((item) => (item.value === 4 ? 'rgba(20, 184, 166, 0.8)' : 'rgba(96, 165, 250, 0.8)')),
        borderColor: dailyMood.map((item) => (item.value === 4 ? 'rgb(13, 148, 136)' : 'rgb(59, 130, 246)')),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  // Opsi chart
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
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <main className="flex-1 p-6 md:p-10 overflow-auto">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-2xl font-semibold text-gray-700">Hi, {userData?.name || 'User'}!</p>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sentiment Positif Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Sentimen Positif</h3>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-green-400 rounded"></div>
            </div>
          </div>
          <div className="text-4xl font-bold mb-2">{dashboardData.sentimentPositif}</div>
          <div className="flex items-center text-green-500 text-sm">
            <span className="mr-1">↗</span>
            <span>{dashboardData.positifPercentage}% Up from past week</span>
          </div>
        </div>

        {/* Sentiment Negatif Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Sentimen Negatif</h3>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-red-400 rounded"></div>
            </div>
          </div>
          <div className="text-4xl font-bold mb-2">{dashboardData.sentimentNegatif}</div>
          <div className="flex items-center text-green-500 text-sm">
            <span className="mr-1">↗</span>
            <span>{dashboardData.negatifPercentage}% Up from past week</span>
          </div>
        </div>

        {/* Treatment Suggestions */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Treatment Suggest</h3>
          <ul className="space-y-4">
            {dashboardData.recommendations.map((rec, index) => (
              <li key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>{rec.title}</span>
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <span className="mr-1">{rec.duration}</span>
                  {rec.duration.includes('h') ? <Timer size={16} /> : <Clock size={16} />}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mood Graph and Stress Level */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Mood Graph */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Mood Graphic</h3>
            <div className="flex gap-2">
              <button onClick={() => setMoodViewType('month')} className={`text-xs px-3 py-1 rounded-full ${moodViewType === 'month' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}>
                Month
              </button>
              <button onClick={() => setMoodViewType('daily')} className={`text-xs px-3 py-1 rounded-full ${moodViewType === 'daily' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}>
                Daily
              </button>
            </div>
          </div>

          {/* Chart.js Bar Chart */}
          <div className="h-64">
            <Bar data={moodViewType === 'month' ? monthlyChartData : dailyChartData} options={chartOptions} />
          </div>

          {/* Chart Icon */}
          <div className="flex justify-end mt-4">
            <BarChart2 className="text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Stress Level */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
          <h3 className="text-lg font-medium mb-6 text-center">
            Stress level
            <br />
            (Anxiety)
          </h3>
          <div className="relative w-48 h-48 mb-4">
            {/* Background circle */}
            <div className="w-full h-full rounded-full border-[16px] border-gray-100"></div>

            {/* Red progress circle - fixed to show full percentage */}
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full border-[16px] border-red-500"
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((dashboardData.stressLevel / 100) * 2 * Math.PI)}% ${50 - 50 * Math.sin((dashboardData.stressLevel / 100) * 2 * Math.PI)}%, ${
                  dashboardData.stressLevel > 50 ? '100% 0%, 100% 0%, 100% 50%' : ''
                }, ${dashboardData.stressLevel > 75 ? '100% 100%, 50% 100%' : ''})`,
                transform: 'rotate(-90deg)',
              }}
            ></div>

            {/* Percentage text */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="text-4xl font-bold text-gray-800">{dashboardData.stressLevel}%</div>
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center">
            Your stress level is High, try our
            <br />
            recommendation
          </p>
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
