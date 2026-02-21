import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import { X, Store } from 'lucide-react';
import { useSellerAuth } from '../../../models/SellerAuthContext';
import useSellerLoginController from '../../../controllers/useSellerLoginController';
import useSellerRegisterController from '../../../controllers/useSellerRegisterController';
import SellerLoginForm from './SellerLoginForm';
import SellerRegisterForm from './SellerRegisterForm';

const SellerAuthDialog = () => {
    const { isSellerAuthOpen, closeSellerAuth, sellerAuthMode, setSellerAuthMode, sellerToken } = useSellerAuth();

    const {
        formData: loginData,
        loading: loginLoading,
        handleChange: handleLoginChange,
        handleSubmit: handleLoginSubmit
    } = useSellerLoginController();

    const {
        formData: regData,
        loading: regLoading,
        handleChange: handleRegChange,
        handleSubmit: handleRegSubmit
    } = useSellerRegisterController();

    React.useEffect(() => {
        if (sellerToken && isSellerAuthOpen) {
            closeSellerAuth();
        }
    }, [sellerToken, isSellerAuthOpen, closeSellerAuth]);

    return (
        <Dialog.Root open={isSellerAuthOpen} onOpenChange={closeSellerAuth}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-in fade-in duration-300" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-[101] w-full max-w-[480px] max-h-[90vh] translate-x-[-50%] translate-y-[-50%] animate-in zoom-in-95 fade-in duration-300 flex flex-col">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-y-auto custom-scrollbar flex flex-col min-h-0">

                        {/* Header */}
                        <div className="relative p-6 border-b border-gray-50 bg-gradient-to-r from-indigo-50 to-indigo-100/50">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-indigo-600 rounded-lg text-white">
                                    <Store className="w-5 h-5" />
                                </div>
                                <Dialog.Title className="text-2xl font-bold text-gray-900">
                                    Seller Central
                                </Dialog.Title>
                            </div>
                            <Dialog.Description className="text-gray-600 text-sm">
                                {sellerAuthMode === 'login'
                                    ? 'Log in to manage your products and orders'
                                    : 'Start your selling journey with Shopzy today'}
                            </Dialog.Description>
                            <Dialog.Close className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 rounded-full transition-colors outline-none">
                                <X className="w-5 h-5" />
                            </Dialog.Close>
                        </div>

                        <Tabs.Root value={sellerAuthMode} onValueChange={setSellerAuthMode} className="flex flex-col">
                            <Tabs.List className="flex border-b border-gray-100 bg-gray-50/50">
                                <Tabs.Trigger
                                    value="login"
                                    className="flex-1 py-4 text-sm font-bold text-gray-500 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 transition-all outline-none"
                                >
                                    Seller Login
                                </Tabs.Trigger>
                                <Tabs.Trigger
                                    value="register"
                                    className="flex-1 py-4 text-sm font-bold text-gray-500 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 transition-all outline-none"
                                >
                                    Become a Seller
                                </Tabs.Trigger>
                            </Tabs.List>

                            <div className="p-8">
                                <Tabs.Content value="login" className="animate-in fade-in slide-in-from-bottom-2 duration-300 outline-none">
                                    <SellerLoginForm
                                        loginData={loginData}
                                        loginLoading={loginLoading}
                                        handleLoginChange={handleLoginChange}
                                        handleLoginSubmit={handleLoginSubmit}
                                    />
                                </Tabs.Content>

                                <Tabs.Content value="register" className="animate-in fade-in slide-in-from-bottom-2 duration-300 outline-none">
                                    <SellerRegisterForm
                                        regData={regData}
                                        regLoading={regLoading}
                                        handleRegChange={handleRegChange}
                                        handleRegSubmit={handleRegSubmit}
                                    />
                                </Tabs.Content>

                                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                                    <p className="text-sm text-gray-500">
                                        {sellerAuthMode === 'login' ? "Want to sell on Shopzy?" : "Already have a seller account?"}
                                        <button
                                            onClick={() => setSellerAuthMode(sellerAuthMode === 'login' ? 'register' : 'login')}
                                            className="ml-1 text-indigo-600 font-bold hover:underline outline-none"
                                        >
                                            {sellerAuthMode === 'login' ? 'Register here' : 'Sign in'}
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

export default SellerAuthDialog;
