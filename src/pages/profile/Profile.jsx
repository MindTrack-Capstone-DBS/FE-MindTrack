import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import ProfileForm from '../../components/ProfileForm';
import ProfileHeader from '../../components/ProfileHeader';
import PasswordForm from '../../components/PasswordForm';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [editedData, setEditedData] = useState({ ...userData });
  
  // State untuk password
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // Fetch user data from backend
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const user = response.data.user;
      const formattedData = {
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      };
      
      setUserData(formattedData);
      setEditedData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...userData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...userData });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/users/profile', editedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setUserData({ ...editedData });
      setIsEditing(false);
      alert('Profil berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Gagal memperbarui profil!');
    }
  };

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditPhoto = () => {
    alert('Fitur edit foto profile coming soon!');
  };

  // Handler untuk password
  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditPassword = () => {
    setIsEditingPassword(true);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleCancelPassword = () => {
    setIsEditingPassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleSavePassword = async () => {
    // Validasi
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Semua field password harus diisi!');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Password baru dan konfirmasi password tidak cocok!');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('Password baru minimal 6 karakter!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/users/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setIsEditingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      alert('Password berhasil diubah!');
    } catch (error) {
      console.error('Error changing password:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Gagal mengubah password!');
      }
    }
  };

  if (loading) {
    return (
      <div className="mt-20 flex flex-col min-h-screen">
        <Navbar userData={userData} />
        <div className="flex-grow bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
          <div className="text-blue-900">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="mt-20 flex flex-col min-h-screen">
      <Navbar userData={userData} />
      <div className="flex-grow bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center font-sans">
        <main className="flex-1 flex flex-col items-center py-10 px-4 md:px-16">
          <div className="w-full max-w-2xl">
            <ProfileHeader />
            <div className="flex gap-8 border-b border-blue-100 mb-8">
              <button 
                onClick={() => setActiveTab('account')} 
                className={`pb-2 font-semibold transition ${
                  activeTab === 'account' 
                    ? 'border-b-2 border-blue-700 text-blue-900' 
                    : 'text-blue-400'
                }`}
              >
                Informasi Akun
              </button>
              <button 
                onClick={() => setActiveTab('security')} 
                className={`pb-2 font-semibold transition ${
                  activeTab === 'security' 
                    ? 'border-b-2 border-blue-700 text-blue-900' 
                    : 'text-blue-400'
                }`}
              >
                Keamanan & Password
              </button>
            </div>
            {activeTab === 'account' && (
              <ProfileForm
                isEditing={isEditing}
                editedData={editedData}
                handleChange={handleChange}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleCancel={handleCancel}
              />
            )}
            {activeTab === 'security' && (
              <PasswordForm
                isEditing={isEditingPassword}
                passwordData={passwordData}
                handleChange={handlePasswordChange}
                handleEdit={handleEditPassword}
                handleSave={handleSavePassword}
                handleCancel={handleCancelPassword}
              />
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
