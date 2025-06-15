import React, { useState } from 'react';
import { Clock, Timer, BarChart2 } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Lottie from "lottie-react";
import mentalHealthAnim from "../assets/images/mental-health.json"; // ganti sesuai lokasi file JSON


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardContent = ({ userData, dashboardData }) => {
  const [moodViewType, setMoodViewType] = useState('month');

  const dailyMood = [
    { day: 'Sen', value: 3.2 },
    { day: 'Sel', value: 2.8 },
    { day: 'Rab', value: 3.5 },
    { day: 'Kam', value: 4 },
    { day: 'Jum', value: 3.2 },
    { day: 'Sab', value: 2.5 },
    { day: 'Min', value: 3.0 },
  ];

  const monthlyChartData = {
    labels: dashboardData.monthlyMood.map((item) => item.month),
    datasets: [
      {
        label: 'Mood Level',
        data: dashboardData.monthlyMood.map((item) => item.value),
        backgroundColor: dashboardData.monthlyMood.map((item) => item.value === 4 ? 'rgba(20, 184, 166, 0.8)' : 'rgba(209, 213, 219, 0.8)'),
        borderColor: dashboardData.monthlyMood.map((item) => item.value === 4 ? 'rgb(13, 148, 136)' : 'rgb(156, 163, 175)'),
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const dailyChartData = {
    labels: dailyMood.map((item) => item.day),
    datasets: [
      {
        label: 'Mood Level',
        data: dailyMood.map((item) => item.value),
        backgroundColor: dailyMood.map((item) => item.value === 4 ? 'rgba(20, 184, 166, 0.8)' : 'rgba(96, 165, 250, 0.8)'),
        borderColor: dailyMood.map((item) => item.value === 4 ? 'rgb(13, 148, 136)' : 'rgb(59, 130, 246)'),
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
          <p className="text-4xl font-bold text-blue-700">0</p>
          <p className="text-sm text-gray-500">This month</p>
          <p className="text-sm text-green-600 font-medium">+0% from last week</p>
        </div>

        {/* Completed Activities */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between min-h-[180px]">
          <h2 className="text-base font-semibold text-gray-700">Completed Activities</h2>
          <p className="text-4xl font-bold text-pink-700">3</p>
          <p className="text-sm text-gray-500">Recommended actions</p>
          <p className="text-sm text-green-600 font-medium">+0% from last week</p>
        </div>

        {/* Treatment Suggestions */}
        <div className="bg-white rounded-2xl shadow-md p-6 min-h-[180px]">
          <h3 className="text-base font-semibold text-gray-700 mb-4">Treatment Suggestions</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex justify-between items-center">
              <span>• Morning Run</span><span className="text-gray-400 text-xs">45min 🕒</span>
            </li>
            <li className="flex justify-between items-center">
              <span>• 1.5L water daily</span><span className="text-gray-400 text-xs">All day 🕒</span>
            </li>
            <li className="flex justify-between items-center">
              <span>• Mealpreps for 3 days</span><span className="text-gray-400 text-xs">2h 🕒</span>
            </li>
          </ul>
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
              <button
                onClick={() => setMoodViewType('day')}
                className={`text-sm px-3 py-1 rounded-full border ${moodViewType === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Daily
              </button>
              <button
                onClick={() => setMoodViewType('month')}
                className={`text-sm px-3 py-1 rounded-full border ${moodViewType === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
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
          <p className="text-sm text-gray-600 mb-4">
            If you need to speak directly with a mental health professional, feel free to contact one of our trusted partners.
          </p>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>
              <span className="font-medium">Dr. Nina Kusuma</span> – Clinical Psychologist <br />
              <span className="text-gray-500">Phone: <a href="tel:+6281234567890" className="text-blue-600 hover:underline">+62 812 3456 7890</a></span>
            </li>
            <li>
              <span className="font-medium">MindTracks Center</span> – Support Services <br />
              <span className="text-gray-500">Email: <a href="mailto:care@mindcare.id" className="text-blue-600 hover:underline">care@mindtracks.id</a></span>
            </li>
            <li>
              <span className="font-medium">Hotline Sehat Jiwa</span><br />
              <span className="text-gray-500">Call: <a href="tel:119" className="text-blue-600 hover:underline">119 (ext 8)</a></span>
            </li>
          </ul>
        </div>


      </div>
        <Lottie animationData={mentalHealthAnim} loop={true} className="absolute max-w-[250px] w-full right-60 bottom-3" />
    </div>
  );
};

export default DashboardContent;