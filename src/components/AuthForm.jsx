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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login logic
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/home');
    } else {
      // Register logic
      console.log('Register data:', formData);
      // Redirect to login after successful registration
      navigate('/login');
    }
  };

  const toggleAuthPage = () => {
    navigate(isLogin ? '/register' : '/login');
  };

  return (
    <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-white">
      <h2 className="text-xl mb-10 font-sans text-left w-full pl-4">
        <b>MindTrack</b> - <span className="text-blue-700">Track Your Stress</span>
      </h2>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 font-sans">{isLogin ? 'Login' : 'Register'}</h1>

      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <>
              <label className="text-lg font-medium text-white mb-1">Nama</label>
              <input
                type="text"
                name="name"
                placeholder="Masukkan nama anda"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-white placeholder-gray-500 outline-none mb-3"
                required
              />

              <label className="text-lg font-medium text-white mb-1">No Telepon</label>
              <input
                type="text"
                name="phone"
                placeholder="Masukkan no telepon anda"
                value={formData.phone}
                onChange={handleChange}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-white placeholder-gray-500 outline-none mb-3"
                required
              />
            </>
          )}

          <label className="text-lg font-medium text-white mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Masukkan email anda"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-white placeholder-gray-500 outline-none mb-3"
            required
          />

          <label className="text-lg font-medium text-white mb-1">Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Masukkan Password anda"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-white placeholder-gray-500 outline-none pr-10"
              required
            />
            <button type="button" className="absolute right-3 text-gray-700" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="bg-blue-700 text-white rounded-lg py-3.5 text-lg font-semibold mt-6 hover:bg-blue-800 transition-colors">
            {isLogin ? 'Login' : 'Register'}
          </button>

          <div className="mt-6 text-center text-blue-400">
            {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
            <span className="text-blue-700 font-semibold underline cursor-pointer ml-1" onClick={toggleAuthPage}>
              {isLogin ? 'Register' : 'Login'}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
