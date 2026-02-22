import React from 'react';
import { Mail, Smartphone } from 'lucide-react';

const MethodToggle = ({ loginMethod, setLoginMethod }) => {
    return (
        <div className="flex bg-gray-50 p-1 rounded-xl mb-6">
            <button
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${loginMethod === 'email' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <Mail className="w-3.5 h-3.5" />
                Email
            </button>
            <button
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${loginMethod === 'phone' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <Smartphone className="w-3.5 h-3.5" />
                Phone
            </button>
        </div>
    );
};

export default MethodToggle;
