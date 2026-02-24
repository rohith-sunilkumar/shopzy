import React from 'react';
import { Key, Eye, EyeOff, Shield } from 'lucide-react';

const ChangePasswordSection = ({
    passwordForm,
    setPasswordForm,
    changingPassword,
    showCurrentPw,
    setShowCurrentPw,
    showNewPw,
    setShowNewPw,
    handleChangePassword
}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Key className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-900">Change Password</h3>
                    <p className="text-xs text-gray-500">Update your password regularly for better security.</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Current Password</label>
                    <div className="relative">
                        <input
                            type={showCurrentPw ? 'text' : 'password'}
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                            placeholder="Enter your current password"
                            className="flex h-10 w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                        />
                        <button type="button" onClick={() => setShowCurrentPw(!showCurrentPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">New Password</label>
                    <div className="relative">
                        <input
                            type={showNewPw ? 'text' : 'password'}
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                            placeholder="Enter a new password (min. 6 characters)"
                            className="flex h-10 w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                        />
                        <button type="button" onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {passwordForm.newPassword.length > 0 && passwordForm.newPassword.length < 6 && (
                        <p className="text-xs text-red-500">Must be at least 6 characters</p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="Confirm your new password"
                        className="flex h-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                    />
                    {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                        <p className="text-xs text-red-500">Passwords don't match</p>
                    )}
                </div>

                <div className="pt-2">
                    <button
                        onClick={handleChangePassword}
                        disabled={changingPassword}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm disabled:opacity-50"
                    >
                        <Shield className="w-4 h-4" />
                        {changingPassword ? 'Updating...' : 'Update Password'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordSection;
