import React, { useState } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import ProfileForm from '../../components/ProfileForm';
import ProfileHeader from '../../components/ProfileHeader'; // Import ProfileHeader

const Profile = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Yongky',
    email: 'yongky@example.com',
    phone: '+62 812-3456-7890',
    gender: 'Male',
    birthdate: { day: '26', month: 'November', year: '2003' },
    city: 'Jakarta',
  });
  const [editedData, setEditedData] = useState({ ...userData });

  const genderOptions = ['Male', 'Female', 'Other'];
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const years = Array.from({ length: 100 }, (_, i) => String(2024 - i));

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...userData });
  };
  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...userData });
  };
  const handleSave = () => {
    setUserData({ ...editedData });
    setIsEditing(false);
  };
  const handleChange = (field, value) => {
    if (field === 'birthdate') {
      setEditedData((prev) => ({ ...prev, birthdate: { ...prev.birthdate, ...value } }));
    } else {
      setEditedData((prev) => ({ ...prev, [field]: value }));
    }
  };
  const handleEditPhoto = () => {
    alert('Fitur edit foto profile coming soon!');
  };

  return (
    <div className="mt-20 flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center font-sans">
        <main className="flex-1 flex flex-col items-center py-10 px-4 md:px-16">
          <div className="w-full max-w-2xl">
            <ProfileHeader />
            <div className="flex gap-8 border-b border-blue-100 mb-8">
              <button onClick={() => setActiveTab('account')} className={`pb-2 font-semibold transition ${activeTab === 'account' ? 'border-b-2 border-blue-700 text-blue-900' : 'text-blue-400'}`}>Informasi Akun</button>
              <button onClick={() => setActiveTab('security')} className={`pb-2 font-semibold transition ${activeTab === 'security' ? 'border-b-2 border-blue-700 text-blue-900' : 'text-blue-400'}`}>Keamanan & Password</button>
            </div>
            {activeTab === 'account' && (
              <ProfileForm
                isEditing={isEditing}
                editedData={editedData}
                handleChange={handleChange}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleCancel={handleCancel}
                genderOptions={genderOptions}
                days={days}
                months={months}
                years={years}
              />
            )}
            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl shadow p-8 mb-8">
                <h2 className="text-lg font-bold text-blue-900 mb-6">Keamanan & Password</h2>
                <p className="text-blue-900">Fitur pengaturan password dan keamanan akan segera hadir.</p>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
