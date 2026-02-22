import React from 'react';

const SocialLogin = ({ googleLogin }) => {
    return (
        <div className="space-y-4 mb-8">
            <button
                onClick={() => googleLogin()}
                className="w-full py-3 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-3 font-bold text-gray-700 hover:bg-gray-50 transition-all hover:border-gray-300"
            >
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-5 h-5" />
                Continue with Google
            </button>

            <div className="relative flex items-center gap-4">
                <div className="h-px bg-gray-100 flex-1"></div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">or</span>
                <div className="h-px bg-gray-100 flex-1"></div>
            </div>
        </div>
    );
};

export default SocialLogin;
