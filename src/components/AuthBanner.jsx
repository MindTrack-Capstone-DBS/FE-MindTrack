import React from 'react';
import brainLogo from '../assets/images/Logo.png';

function AuthBanner() {
  return (
    <div className="hidden lg:flex w-full lg:w-1/2 bg-blue-900 items-center justify-center h-screen">
      <div
        className="bg-white rounded-full flex items-center justify-center shadow-lg transition-transform
                      w-[200px] h-[200px] 
                      lg:w-[300px] lg:h-[300px] 
                      xl:w-[400px] xl:h-[400px] 
                      2xl:w-[500px] 2xl:h-[500px]"
      >
        <div className="flex flex-col items-center justify-center">
          <img
            src={brainLogo}
            alt="MindTrack Logo"
            className="object-contain
                       w-[150px] h-[150px] 
                       lg:w-[250px] lg:h-[250px] 
                       xl:w-[350px] xl:h-[350px] 
                       2xl:w-[450px] 2xl:h-[450px]"
          />
        </div>
      </div>
    </div>
  );
}

export default AuthBanner;
