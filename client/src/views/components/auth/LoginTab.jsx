import React from 'react';
import SocialLogin from './SocialLogin';
import MethodToggle from './MethodToggle';
import LoginForm from './LoginForm';
import PhoneAuth from './PhoneAuth';

const LoginTab = ({
    googleClientId,
    handleGoogleSuccess,
    handleGoogleError,
    loginMethod,
    setLoginMethod,
    loginData,
    loginLoading,
    loginError,
    loginSuccess,
    handleLoginChange,
    handleLoginSubmit,
    closeAuth,
    otpStep,
    setOtpStep,
    phone,
    setPhone,
    otp,
    setOtp
}) => {
    return (
        <>
            {googleClientId && (
                <SocialLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                />
            )}

            <MethodToggle loginMethod={loginMethod} setLoginMethod={setLoginMethod} />

            {loginMethod === 'email' ? (
                <LoginForm
                    loginData={loginData}
                    loginLoading={loginLoading}
                    loginError={loginError}
                    loginSuccess={loginSuccess}
                    handleLoginChange={handleLoginChange}
                    handleLoginSubmit={handleLoginSubmit}
                />
            ) : (
                <PhoneAuth
                    onSuccess={closeAuth}
                    step={otpStep}
                    setStep={setOtpStep}
                    phone={phone}
                    setPhone={setPhone}
                    otp={otp}
                    setOtp={setOtp}
                />
            )}
        </>
    );
};

export default LoginTab;
