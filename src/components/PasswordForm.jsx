import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const PasswordForm = ({ isEditing, passwordData, handleChange, handleEdit, handleSave, handleCancel }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-8 mb-8">
      <h2 className="text-lg font-bold text-blue-900 mb-6">Keamanan & Password</h2>

      {isEditing ? (
        <>
          {/* Current Password Field */}
          <div className="flex items-center gap-4 mb-6">
            <Lock className="text-blue-500" size={20} />
            <div className="flex-1 relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => handleChange('currentPassword', e.target.value)}
                className="w-full p-2 pr-10 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password saat ini"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
              >
                {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New Password Field */}
          <div className="flex items-center gap-4 mb-6">
            <Lock className="text-blue-500" size={20} />
            <div className="flex-1 relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => handleChange('newPassword', e.target.value)}
                className="w-full p-2 pr-10 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password baru (minimal 6 karakter)"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="flex items-center gap-4 mb-6">
            <Lock className="text-blue-500" size={20} />
            <div className="flex-1 relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className="w-full p-2 pr-10 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Konfirmasi password baru"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Persyaratan Password:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li className={`flex items-center gap-2 ${
                passwordData.newPassword.length >= 6 ? 'text-green-600' : 'text-blue-700'
              }`}>
                <span className="w-2 h-2 rounded-full ${
                  passwordData.newPassword.length >= 6 ? 'bg-green-500' : 'bg-blue-300'
                }"></span>
                Minimal 6 karakter
              </li>
              <li className={`flex items-center gap-2 ${
                passwordData.newPassword === passwordData.confirmPassword && passwordData.confirmPassword !== '' 
                  ? 'text-green-600' : 'text-blue-700'
              }`}>
                <span className="w-2 h-2 rounded-full ${
                  passwordData.newPassword === passwordData.confirmPassword && passwordData.confirmPassword !== ''
                    ? 'bg-green-500' : 'bg-blue-300'
                }"></span>
                Password dan konfirmasi harus sama
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={handleSave} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Ubah Password
            </button>
            <button 
              onClick={handleCancel} 
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Batal
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-6">
            <Lock className="text-blue-500" size={20} />
            <span className="flex-1 text-blue-900">••••••••••••</span>
          </div>
          <p className="text-sm text-blue-600 mb-6">
            Untuk keamanan akun Anda, ubah password secara berkala dan gunakan kombinasi huruf, angka, dan simbol.
          </p>
          <button 
            onClick={handleEdit} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Lock size={16} />
            Ubah Password
          </button>
        </>
      )}
    </div>
  );
};

export default PasswordForm;