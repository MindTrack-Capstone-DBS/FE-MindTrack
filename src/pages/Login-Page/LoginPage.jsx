import React from 'react';
import AuthBanner from '../../components/AuthBanner';
import AuthForm from '../../components/AuthForm';

function LoginPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <AuthForm isLogin={true} />
      <AuthBanner />
    </div>
  );
}

export default LoginPage;
