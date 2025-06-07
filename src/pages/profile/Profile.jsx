import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Yongky",
    email: "yongky@example.com",
    phone: "+62 812-3456-7890",
    stressLevel: 65,
    profileImage: null
  });

  const [editedData, setEditedData] = useState({...userData});

  const getStressLevelColor = (percentage) => {
    if (percentage < 40) return '#4CAF50';
    if (percentage < 70) return '#FFC107';
    return '#F44336';
  };

  const getStressLevelLabel = (percentage) => {
    if (percentage < 40) return 'Rendah';
    if (percentage < 70) return 'Sedang';
    return 'Tinggi';
  };

  const handleBackToHome = () => {
    navigate('/landing');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedData({...userData});
  };

  const handleSaveProfile = () => {
    setUserData(editedData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedData({...userData});
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="profile-page">
      <div className="profile-background"></div>
      
      <header className="profile-header">
        <div className="header-content">
          <button className="back-button" onClick={handleBackToHome}>
            <i className="fas fa-arrow-left"></i>
            <span>Kembali</span>
          </button>
          <h1>Profil Pengguna</h1>
        </div>
      </header>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {userData.profileImage ? (
                <img src={userData.profileImage} alt="Profile" className="profile-image" />
              ) : (
                <i className="fas fa-user"></i>
              )}
            </div>
            <div className="avatar-actions">
              <label className="upload-button">
                <i className="fas fa-camera"></i>
                <span>Ubah Foto</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>
          
          <div className="profile-info">
            <div className="info-header">
              <h2>Informasi Pribadi</h2>
              {!isEditing ? (
                <button className="edit-button" onClick={handleEditProfile}>
                  <i className="fas fa-edit"></i>
                  <span>Edit Profil</span>
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="save-button" onClick={handleSaveProfile}>
                    <i className="fas fa-check"></i>
                    <span>Simpan</span>
                  </button>
                  <button className="cancel-button" onClick={handleCancelEdit}>
                    <i className="fas fa-times"></i>
                    <span>Batal</span>
                  </button>
                </div>
              )}
            </div>

            <div className="info-group">
              <label>Nama Lengkap</label>
              {isEditing ? (
                <input
                  type="text"
                  className="edit-input"
                  value={editedData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Masukkan nama lengkap"
                />
              ) : (
                <div className="info-value">
                  <i className="fas fa-user-circle"></i>
                  {userData.name}
                </div>
              )}
            </div>
            
            <div className="info-group">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  className="edit-input"
                  value={editedData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Masukkan email"
                />
              ) : (
                <div className="info-value">
                  <i className="fas fa-envelope"></i>
                  {userData.email}
                </div>
              )}
            </div>
            
            <div className="info-group">
              <label>Nomor Telepon</label>
              {isEditing ? (
                <input
                  type="tel"
                  className="edit-input"
                  value={editedData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Masukkan nomor telepon"
                />
              ) : (
                <div className="info-value">
                  <i className="fas fa-phone"></i>
                  {userData.phone}
                </div>
              )}
            </div>
          </div>

          <div className="stress-section">
            <h2>Statistik Tingkat Stres</h2>
            <div className="stress-block">
              <div className="stress-level-container">
                <div 
                  className="stress-level" 
                  style={{ 
                    width: `${userData.stressLevel}%`,
                    backgroundColor: getStressLevelColor(userData.stressLevel)
                  }}
                />
              </div>
              <div className="stress-info">
                <div className="stress-percentage">{userData.stressLevel}%</div>
                <div className="stress-label" style={{ color: getStressLevelColor(userData.stressLevel) }}>
                  {getStressLevelLabel(userData.stressLevel)}
                </div>
              </div>
            </div>

            <div className="stress-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#4CAF50' }}></div>
                <span>Rendah</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#FFC107' }}></div>
                <span>Sedang</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#F44336' }}></div>
                <span>Tinggi</span>
              </div>
            </div>

            <div className="stress-recommendations">
              <h3>Rekomendasi</h3>
              <div className="recommendation-list">
                <div className="recommendation-item">
                  <i className="fas fa-walking"></i>
                  <span>Berjalan-jalan selama 15 menit</span>
                </div>
                <div className="recommendation-item">
                  <i className="fas fa-music"></i>
                  <span>Dengarkan musik yang menenangkan</span>
                </div>
                <div className="recommendation-item">
                  <i className="fas fa-spa"></i>
                  <span>Lakukan latihan pernapasan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 