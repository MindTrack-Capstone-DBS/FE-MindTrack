import brainLogo from '../assets/images/Logo.png';

function LoginBanner() {
  return (
    <div className="bg-blue-700 flex items-center justify-center w-full h-full">
      <div className="bg-white rounded-full p-8 flex items-center justify-center">
        <div className="flex items-center">
          <img src={brainLogo} alt="MindTrack Logo" className="w-12 h-12" />
          <h2 className="text-blue-700 text-3xl font-bold ml-2">MindTrack</h2>
        </div>
      </div>
    </div>
  );
}

export default LoginBanner;
