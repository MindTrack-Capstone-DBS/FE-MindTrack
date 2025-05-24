import React from 'react';
import './Profile.css';

const Profile = () => {
  // Mock data - in a real application, this would come from an API or state management
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+62 812-3456-7890',
    stressLevel: 65, // Percentage
  };

  const getStressLevelColor = (level) => {
    if (level < 30) return '#4CAF50'; // Green for low stress
    if (level < 70) return '#FFC107'; // Yellow for medium stress
    return '#F44336'; // Red for high stress
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>Profile</h2>
        </div>
        
        <div className="profile-info">
          <div className="info-item">
            <label>Nama:</label>
            <span>{userData.name}</span>
          </div>
          <div className="info-item">
            <label>Email:</label>
            <span>{userData.email}</span>
          </div>
          <div className="info-item">
            <label>No. Telepon:</label>
            <span>{userData.phone}</span>
          </div>
        </div>

        <div className="stress-statistics">
          <h3>Tingkat Stres</h3>
          <div className="stress-block">
            <div 
              className="stress-level"
              style={{ 
                width: `${userData.stressLevel}%`,
                backgroundColor: getStressLevelColor(userData.stressLevel)
              }}
            >
              {userData.stressLevel}%
            </div>
          </div>
          <div className="stress-labels">
            <span>Rendah</span>
            <span>Sedang</span>
            <span>Tinggi</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 