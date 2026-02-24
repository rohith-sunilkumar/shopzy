import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import useAuthDialogController from '../../../controllers/useAuthDialogController';
import AuthDialogHeader from './AuthDialogHeader';
import LoginTab from './LoginTab';
import RegisterTab from './RegisterTab';

const AuthDialog = () => {
    const {
        isAuthOpen,
        closeAuth,
        authMode,
        setAuthMode,
        loginMethod,
        setLoginMethod,
        otpStep,
        setOtpStep,
        phone,
        setPhone,
        otp,
        setOtp,
        googleClientId,
        handleGoogleSuccess,
        handleGoogleError,
        loginData,
        loginLoading,
        loginError,
        loginSuccess,
        handleLoginChange,
        handleLoginSubmit,
        regData,
        regLoading,
        handleRegChange,
        handleRegSubmit
    } = useAuthDialogController();

    return (
        <Dialog.Root open={isAuthOpen} onOpenChange={closeAuth}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] animate-in fade-in duration-300" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-[101] w-full max-w-[440px] max-h-[90vh] translate-x-[-50%] translate-y-[-50%] animate-in zoom-in-95 fade-in duration-300 flex flex-col">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-y-auto custom-scrollbar flex flex-col min-h-0">
                        <AuthDialogHeader authMode={authMode} />

                        <Tabs.Root value={authMode} onValueChange={setAuthMode} className="flex flex-col">
                            <Tabs.List className="flex border-b border-gray-100 bg-gray-50/30">
                                <Tabs.Trigger
                                    value="login"
                                    className="flex-1 py-3 text-sm font-semibold text-gray-500 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 transition-all outline-none"
                                >
                                    Sign In
                                </Tabs.Trigger>
                                <Tabs.Trigger
                                    value="register"
                                    className="flex-1 py-3 text-sm font-semibold text-gray-500 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 transition-all outline-none"
                                >
                                    Sign Up
                                </Tabs.Trigger>
                            </Tabs.List>

                            <div className="p-8">
                                <Tabs.Content value="login" className="animate-in fade-in slide-in-from-bottom-2 duration-300 outline-none">
                                    <LoginTab
                                        googleClientId={googleClientId}
                                        handleGoogleSuccess={handleGoogleSuccess}
                                        handleGoogleError={handleGoogleError}
                                        loginMethod={loginMethod}
                                        setLoginMethod={setLoginMethod}
                                        loginData={loginData}
                                        loginLoading={loginLoading}
                                        loginError={loginError}
                                        loginSuccess={loginSuccess}
                                        handleLoginChange={handleLoginChange}
                                        handleLoginSubmit={handleLoginSubmit}
                                        closeAuth={closeAuth}
                                        otpStep={otpStep}
                                        setOtpStep={setOtpStep}
                                        phone={phone}
                                        setPhone={setPhone}
                                        otp={otp}
                                        setOtp={setOtp}
                                    />
                                </Tabs.Content>

                                <Tabs.Content value="register" className="animate-in fade-in slide-in-from-bottom-2 duration-300 outline-none">
                                    <RegisterTab
                                        loginMethod={loginMethod}
                                        setLoginMethod={setLoginMethod}
                                        regData={regData}
                                        regLoading={regLoading}
                                        handleRegChange={handleRegChange}
                                        handleRegSubmit={handleRegSubmit}
                                        closeAuth={closeAuth}
                                        otpStep={otpStep}
                                        setOtpStep={setOtpStep}
                                        phone={phone}
                                        setPhone={setPhone}
                                        otp={otp}
                                        setOtp={setOtp}
                                    />
                                </Tabs.Content>

                                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                                    <p className="text-sm text-gray-500">
                                        {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
                                        <button
                                            onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                                            className="ml-1 text-indigo-600 font-bold hover:underline outline-none"
                                        >
                                            {authMode === 'login' ? 'Sign up' : 'Sign in'}
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </Tabs.Root>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default AuthDialog;
