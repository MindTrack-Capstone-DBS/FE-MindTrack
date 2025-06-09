import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardContent from '../../components/DashboardContent';
import Footer from '../../components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: 'User',
  });

  // Data untuk dashboard
  const dashboardData = {
    sentimentPositif: 10,
    sentimentNegatif: 5,
    positifPercentage: 1.3,
    negatifPercentage: 1.3,
    recommendations: [
      { title: 'Morning Run', duration: '45min' },
      { title: '1.5 of water daily', duration: 'All day' },
      { title: 'Cooking mealpreps for 3 days', duration: '2h' },
    ],
    stressLevel: 85,
    monthlyMood: [
      { month: 'Jan', value: 3 },
      { month: 'Feb', value: 2 },
      { month: 'Mar', value: 3.5 },
      { month: 'Apr', value: 2.8 },
      { month: 'May', value: 2.2 },
      { month: 'Jun', value: 3.2 },
      { month: 'Jul', value: 4 },
      { month: 'Sep', value: 2.7 },
      { month: 'Aug', value: 3.5 },
      { month: 'Oct', value: 2.1 },
      { month: 'Nov', value: 2.8 },
      { month: 'Dec', value: 2.5 },
    ],
  };

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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - fixed, non-scrollable */}
      <Sidebar />

      {/* Main Content - scrollable */}
      <div className="flex-1 flex flex-col overflow-auto">
        <DashboardContent userData={userData} dashboardData={dashboardData} />
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
