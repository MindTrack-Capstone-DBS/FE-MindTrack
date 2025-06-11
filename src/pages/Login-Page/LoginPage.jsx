import React from 'react';
import AuthBanner from '../../components/AuthBanner';
import AuthForm from '../../components/AuthForm';

function LoginPage() {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white overflow-hidden">
      <AuthForm isLogin={true} />
      <AuthBanner />
    </div>
  );
}

export default LoginPage;
