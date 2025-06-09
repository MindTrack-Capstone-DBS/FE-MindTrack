import React, { useState } from 'react';
import { Clock, Timer, Search, Bell, User, LogOut, Settings, ChevronDown, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardContent = ({ userData, dashboardData }) => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    navigate('/'); // Navigasi ke landing page
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <main className="flex-1 p-6 md:p-10 overflow-auto">
      {/* Header with Search, Notification, Status and Profile */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex-1">
          <div className="relative max-w-md">
            <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Status (Anxiety) */}
          <div className="bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-medium">Anxiety</div>

          {/* Notification Icon */}
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Profile with Dropdown */}
          <div className="relative">
            <button onClick={toggleProfileMenu} className="flex items-center gap-2 focus:outline-none">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center text-white font-bold">
                {userData?.name
                  ? userData.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .substring(0, 2)
                  : 'U'}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
                <button onClick={() => navigate('/profile')} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings className="w-4 h-4" />
                  Pengaturan Akun
                </button>
                <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

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

          {/* Bar Chart */}
          <div className="h-64 flex items-end justify-between">
            {moodViewType === 'month'
              ? // Monthly view
                dashboardData.monthlyMood.map((item, index) => {
                  const height = (item.value / 4) * 100;
                  const isHighest = item.value === 4;
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`w-6 rounded-t-md ${isHighest ? 'bg-teal-500' : 'bg-gray-300'}`} style={{ height: `${height}%` }}></div>
                      <div className="text-xs text-gray-500 mt-2">{item.month}</div>
                    </div>
                  );
                })
              : // Daily view
                dailyMood.map((item, index) => {
                  const height = (item.value / 4) * 100;
                  const isHighest = item.value === 4;
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`w-8 rounded-t-md ${isHighest ? 'bg-teal-500' : 'bg-blue-400'}`} style={{ height: `${height}%` }}></div>
                      <div className="text-xs text-gray-500 mt-2">{item.day}</div>
                    </div>
                  );
                })}
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
