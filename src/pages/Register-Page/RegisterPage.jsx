import React from 'react';
import AuthBanner from '../../components/AuthBanner';
import AuthForm from '../../components/AuthForm';

function RegisterPage() {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white overflow-hidden">
      <AuthForm isLogin={false} />
      <AuthBanner />
    </div>
  );
}

export default RegisterPage;
