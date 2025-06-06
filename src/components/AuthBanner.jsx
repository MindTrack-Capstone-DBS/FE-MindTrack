import React from 'react';
import brainLogo from '../assets/images/Logo.png';

function AuthBanner() {
  return (
    <div className="hidden md:flex w-full md:w-1/2 bg-blue-900 items-center justify-center h-screen">
      <div className="bg-white rounded-full w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center shadow-lg transition-transform">
        <div className="flex flex-col items-center justify-center">
          <img src={brainLogo} alt="MindTrack Logo" className="w-[400px] h-[400px] md:w-[700px] md:h-[700px] object-contain" />
        </div>
      </div>
    </div>
  );
}

export default AuthBanner;
