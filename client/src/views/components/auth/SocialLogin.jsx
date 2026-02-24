import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const SocialLogin = ({ onSuccess, onError }) => {
    return (
        <div className="space-y-4 mb-8">
            <div className="flex justify-center w-full">
                <GoogleLogin
                    onSuccess={onSuccess}
                    onError={onError}
                    // useOneTap // Disabled to prevent FedCM abort errors until origin is verified
                    shape="rectangular"
                    theme="outline"
                />
            </div>

            <div className="relative flex items-center gap-4 mt-6">
                <div className="h-px bg-gray-100 flex-1"></div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">or</span>
                <div className="h-px bg-gray-100 flex-1"></div>
            </div>
        </div>
    );
};

export default SocialLogin;
