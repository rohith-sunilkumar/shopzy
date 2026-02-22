import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Smartphone, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../../models/AuthContext';
import toast from 'react-hot-toast';

const PhoneAuth = ({ onSuccess, step, setStep, phone, setPhone, otp, setOtp }) => {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);


    const handleSendOTP = async () => {
        if (!phone || phone.length < 10) {
            toast.error("Please enter a valid phone number.");
            return;
        }

        setLoading(true);
        try {
            await axios.post("http://localhost:3000/auth/otp/request", { phoneNumber: `+${phone}` });
            toast.success("OTP sent successfully!");
            setStep(2);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp || otp.length !== 6) {
            toast.error("Please enter a 6-digit OTP.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/auth/otp/verify", {
                phoneNumber: `+${phone}`,
                otp
            }, { withCredentials: true });

            toast.success("Login successful!");
            login(response.data.accessToken);
            if (onSuccess) onSuccess();
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid OTP.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {step === 1 ? (
                <div className="space-y-4">
                    <div className="space-y-1.5 text-center mb-6">
                        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Smartphone className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Phone Login</h3>
                        <p className="text-sm text-gray-500">We'll send a 6-digit code to verify your number</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Phone Number</label>
                        <PhoneInput
                            country={'in'}
                            value={phone}
                            onChange={setPhone}
                            containerClass="!w-full"
                            inputClass="!w-full !h-12 !border-gray-200 !rounded-xl !pl-14 !text-base focus:!border-indigo-500 focus:!ring-2 focus:!ring-indigo-100"
                            buttonClass="!border-gray-200 !rounded-l-xl !bg-gray-50"
                        />
                    </div>

                    <button
                        onClick={handleSendOTP}
                        disabled={loading}
                        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 mt-4"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Get OTP"}
                        {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="space-y-1.5 text-center mb-6">
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Verify OTP</h3>
                        <p className="text-sm text-gray-500">Enter the code sent to +{phone}</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">6-Digit Code</label>
                        <input
                            type="text"
                            maxLength={6}
                            placeholder="0 0 0 0 0 0"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl outline-none text-center text-2xl font-black tracking-[0.5em] focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        <button
                            onClick={handleVerifyOTP}
                            disabled={loading}
                            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Login"}
                        </button>
                        <button
                            onClick={() => setStep(1)}
                            className="text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                            Change Number
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhoneAuth;
