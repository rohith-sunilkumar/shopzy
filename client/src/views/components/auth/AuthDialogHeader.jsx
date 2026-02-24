import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

const AuthDialogHeader = ({ authMode }) => {
    return (
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
    );
};

export default AuthDialogHeader;
