import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementasi login akan ditambahkan di sini
    console.log('Login dengan:', { email, password });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500" required />
        </div>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
            required
          />
          <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <span>👁️</span> // Ganti dengan icon yang sesuai
            ) : (
              <span>👁️‍🗨️</span> // Ganti dengan icon yang sesuai
            )}
          </button>
        </div>

        <button type="submit" className="bg-black text-white py-3 rounded-md mt-4 hover:bg-gray-800 transition-colors">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
