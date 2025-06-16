import React from 'react';
import { User, Mail, Phone } from 'lucide-react';

const ProfileForm = ({ isEditing, editedData, handleChange, handleEdit, handleSave, handleCancel }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-8 mb-8">
      <h2 className="text-lg font-bold text-blue-900 mb-6">Data Diri</h2>

      {/* Name Field */}
      <div className="flex items-center gap-4 mb-6">
        <User className="text-blue-500" size={20} />
        {isEditing ? (
          <input
            type="text"
            value={editedData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="flex-1 p-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nama lengkap"
          />
        ) : (
          <span className="flex-1 text-blue-900">{editedData.name || 'Belum diisi'}</span>
        )}
      </div>

      {/* Email Field */}
      <div className="flex items-center gap-4 mb-6">
        <Mail className="text-blue-500" size={20} />
        {isEditing ? (
          <input
            type="email"
            value={editedData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="flex-1 p-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
          />
        ) : (
          <span className="flex-1 text-blue-900">{editedData.email || 'Belum diisi'}</span>
        )}
      </div>

      {/* Phone Field */}
      <div className="flex items-center gap-4 mb-6">
        <Phone className="text-blue-500" size={20} />
        {isEditing ? (
          <input
            type="tel"
            value={editedData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="flex-1 p-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nomor telepon"
          />
        ) : (
          <span className="flex-1 text-blue-900">{editedData.phone || 'Belum diisi'}</span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Simpan
            </button>
            <button onClick={handleCancel} className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition">
              Batal
            </button>
          </>
        ) : (
          <button onClick={handleEdit} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <User size={16} />
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
