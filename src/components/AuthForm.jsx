import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

function AuthForm({ isLogin = true }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login logic
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Simpan data autentikasi
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('token', data.token);
          localStorage.setItem('userData', JSON.stringify(data.user));

          alert('Login berhasil!');

          window.location.href = '/dashboard';
          window.location.reload();
        } else {
          alert(data.message || 'Login gagal');
        }
      } else {
        // Register logic
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Registrasi berhasil! Silakan login.');
          navigate('/login');
        } else {
          alert(data.message || 'Registrasi gagal');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const toggleAuthPage = () => {
    navigate(isLogin ? '/register' : '/login');
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white h-screen p-4 lg:p-8 relative overflow-y-auto">
      {/* Header tetap di pojok kiri atas */}
      <div className="absolute top-4 left-4 lg:top-8 lg:left-8 z-10">
        <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl font-sans">
          <b>MindTrack</b> - <span className="text-blue-900 font-bold">Track Your Stress</span>
        </h2>
      </div>

      {/* Container form yang terpusat */}
      <div className="w-full max-w-md flex-shrink-0">
        {/* Title */}
        <div className="text-center mb-6">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 font-sans">{isLogin ? 'Login' : 'Register'}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm sm:text-base font-medium text-black mb-2">Nama</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Masukkan nama anda"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-black placeholder-gray-500 outline-none focus:border-blue-500 transition-colors text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-black mb-2">No Telepon</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Masukkan no telepon anda"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-black placeholder-gray-500 outline-none focus:border-blue-500 transition-colors text-sm"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm sm:text-base font-medium text-black mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Masukkan email anda"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-black placeholder-gray-500 outline-none focus:border-blue-500 transition-colors text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-black mb-2">Password</label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Masukkan Password anda"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-black placeholder-gray-500 outline-none pr-12 focus:border-blue-500 transition-colors text-sm"
                required
              />
              <button type="button" className="absolute right-3 text-gray-700 hover:text-gray-900 transition-colors" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-900 text-white rounded-lg py-3 text-base font-semibold mt-6 hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            {isLogin ? 'Login' : 'Register'}
          </button>

          <div className="mt-6 text-center text-black text-sm">
            {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
            <span className="text-blue-700 font-semibold underline cursor-pointer ml-1 hover:text-blue-800 transition-colors" onClick={toggleAuthPage}>
              {isLogin ? 'Register' : 'Login'}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
