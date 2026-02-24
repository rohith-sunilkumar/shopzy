import React from 'react';
import MethodToggle from './MethodToggle';
import RegisterForm from './RegisterForm';
import PhoneAuth from './PhoneAuth';

const RegisterTab = ({
    loginMethod,
    setLoginMethod,
    regData,
    regLoading,
    handleRegChange,
    handleRegSubmit,
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
            <MethodToggle loginMethod={loginMethod} setLoginMethod={setLoginMethod} />

            {loginMethod === 'email' ? (
                <RegisterForm
                    regData={regData}
                    regLoading={regLoading}
                    handleRegChange={handleRegChange}
                    handleRegSubmit={handleRegSubmit}
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

export default RegisterTab;
