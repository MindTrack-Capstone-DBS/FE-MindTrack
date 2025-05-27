import LoginForm from './LoginForm';
import LoginBanner from './LoginBanner';

function LoginPage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          <div className="mb-8">
            <h1 className="text-xl font-bold">MindTrack - </h1>
            <h2 className="text-4xl font-bold text-blue-700">
              Track
              <br />
              Your Stress
            </h2>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="w-1/2">
        <LoginBanner />
      </div>
    </div>
  );
}

export default LoginPage;
