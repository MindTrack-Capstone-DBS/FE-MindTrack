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
      navigate('/login');
    }
  };

  const toggleAuthPage = () => {
    navigate(isLogin ? '/register' : '/login');
  };

  return (
    <div className="w-1/2 flex justify-center items-center bg-white overflow-x-hidden">
      <div className="w-full max-w-sm">
        <h2 className="text-xl mb-15 font-sans text-left absolute top-10 left-10">
          <b>MindTrack</b> - <span className="text-blue-900 font-bold">Track Your Stress</span>
        </h2>
        <p className="text-4xl font-bold mb-10 mt-20 text-center text-gray font-sans">{isLogin ? 'Login' : 'Register'}</p>

        <form onSubmit={handleSubmit} className="flex flex-col ">
          {!isLogin && (
            <>
              <label className="text-lg font-medium text-black ">Nama</label>
              <input
                type="text"
                name="name"
                placeholder="Masukkan nama anda"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-black placeholder-gray-500 outline-none mb-3"
                required
              />

              <label className="text-lg font-medium text-black mb-1">No Telepon</label>
              <input
                type="text"
                name="phone"
                placeholder="Masukkan no telepon anda"
                value={formData.phone}
                onChange={handleChange}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-black placeholder-gray-500 outline-none mb-3"
                required
              />
            </>
          )}

          <label className="text-lg font-medium text-black mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Masukkan email anda"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-black placeholder-gray-500 outline-none mb-3"
            required
          />

          <label className="text-lg font-medium text-black mb-1">Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Masukkan Password anda"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-black placeholder-gray-500 outline-none pr-10"
              required
            />
            <button type="button" className="absolute right-3 text-gray-700" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="bg-blue-900 text-white rounded-lg py-3.5 text-lg font-semibold mt-6 hover:bg-blue-500 transition-colors">
            {isLogin ? 'Login' : 'Register'}
          </button>

          <div className="mt-6 text-center text-black">
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
