import React from 'react';
import AuthBanner from '../../components/AuthBanner';
import AuthForm from '../../components/AuthForm';

function RegisterPage() {
  return (
    <div className="flex flex-row min-h-screen bg-white">
      <AuthForm isLogin={false} />
      <AuthBanner />
    </div>
  );
}

export default RegisterPage;