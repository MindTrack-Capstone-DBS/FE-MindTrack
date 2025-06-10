import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import DashboardContent from '../../components/DashboardContent';
import Footer from '../../components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: 'User',
  });
  const [dashboardData, setDashboardData] = useState({
    sentimentPositif: 0,
    sentimentNegatif: 0,
    positifPercentage: 0,
    negatifPercentage: 0,
    recommendations: [
      { title: 'Morning Run', duration: '45min' },
      { title: '1.5 of water daily', duration: 'All day' },
      { title: 'Cooking mealpreps for 3 days', duration: '2h' },
    ],
    stressLevel: 0,
    monthlyMood: [
      { month: 'Jan', value: 0 },
      { month: 'Feb', value: 0 },
      { month: 'Mar', value: 0 },
      { month: 'Apr', value: 0 },
      { month: 'May', value: 0 },
      { month: 'Jun', value: 0 },
      { month: 'Jul', value: 0 },
      { month: 'Aug', value: 0 },
      { month: 'Sep', value: 0 },
      { month: 'Oct', value: 0 },
      { month: 'Nov', value: 0 },
      { month: 'Dec', value: 0 },
    ],
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

  // Fetch journal data for dashboard
  useEffect(() => {
    const fetchJournalData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/journals/stats`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch journal statistics');
        }

        const data = await response.json();

        // Update dashboard data with fetched statistics
        setDashboardData((prevData) => ({
          ...prevData,
          sentimentPositif: data.positiveCount || 0,
          sentimentNegatif: data.negativeCount || 0,
          positifPercentage: data.positivePercentage || 0,
          negatifPercentage: data.negativePercentage || 0,
          stressLevel: data.stressLevel || 0,
          monthlyMood: data.monthlyMood || prevData.monthlyMood,
        }));
      } catch (error) {
        console.error('Error fetching journal statistics:', error);
      }
    };

    if (localStorage.getItem('token')) {
      fetchJournalData();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar - fixed at top */}
      <Navbar isLandingPage={false} />

      {/* Main Content - scrollable with padding for navbar */}
      <div className="pt-20 flex-1 flex flex-col overflow-auto">
        <DashboardContent userData={userData} dashboardData={dashboardData} />
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
