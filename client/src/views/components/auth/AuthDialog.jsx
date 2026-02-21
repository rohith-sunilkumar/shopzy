import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import { X } from 'lucide-react';
import { useAuth } from '../../../models/AuthContext';
import useLoginController from '../../../controllers/useLoginController';
import useRegisterController from '../../../controllers/useRegisterController';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthDialog = () => {
    const { isAuthOpen, closeAuth, authMode, setAuthMode, accessToken } = useAuth();

    const {
        formData: loginData,
        logging: loginLoading,
        handleChange: handleLoginChange,
        handleSubmit: handleLoginSubmit
    } = useLoginController();

    const {
        formData: regData,
        loading: regLoading,
        handleChange: handleRegChange,
        handleSubmit: handleRegSubmit
    } = useRegisterController();

    React.useEffect(() => {
        if (accessToken && isAuthOpen) {
            closeAuth();
        }
    }, [accessToken, isAuthOpen, closeAuth]);

    return (
        <Dialog.Root open={isAuthOpen} onOpenChange={closeAuth}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] animate-in fade-in duration-300" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-[101] w-full max-w-[440px] max-h-[90vh] translate-x-[-50%] translate-y-[-50%] animate-in zoom-in-95 fade-in duration-300 flex flex-col">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-y-auto custom-scrollbar flex flex-col min-h-0">
                        {/* Header */}
                        <div className="relative p-6 border-b border-gray-50 bg-gradient-to-r from-indigo-50/50 to-violet-50/50">
                            <Dialog.Title className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                            </Dialog.Title>
                            <Dialog.Description className="text-gray-500 text-sm mt-1">
                                {authMode === 'login' ? 'Enter your details to sign in to your account' : 'Join our community and start shopping'}
                            </Dialog.Description>
                            <Dialog.Close className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors outline-none">
                                <X className="w-5 h-5" />
                            </Dialog.Close>
                        </div>

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
                                    <LoginForm
                                        loginData={loginData}
                                        loginLoading={loginLoading}
                                        handleLoginChange={handleLoginChange}
                                        handleLoginSubmit={handleLoginSubmit}
                                    />
                                </Tabs.Content>

                                <Tabs.Content value="register" className="animate-in fade-in slide-in-from-bottom-2 duration-300 outline-none">
                                    <RegisterForm
                                        regData={regData}
                                        regLoading={regLoading}
                                        handleRegChange={handleRegChange}
                                        handleRegSubmit={handleRegSubmit}
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
