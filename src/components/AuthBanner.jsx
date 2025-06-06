import React from 'react';
import brainLogo from '../assets/images/Logo.png';

function AuthBanner() {
  return (
    <div className="w-1/2 bg-blue-900 flex items-center justify-center h-screen">
      <div className="bg-white rounded-full w-[500px] h-[500px] flex items-center justify-center shadow-lg transition-transform ">
        <div className="flex flex-col items-center justify-center">
          <img src={brainLogo} alt="MindTrack Logo" className="w-[700px] h-[700px] object-contain" />
        </div>
      </div>
    </div>
  );
}

export default AuthBanner;
