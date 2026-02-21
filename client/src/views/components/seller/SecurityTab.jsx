import React from 'react';
import { Shield, Key, Eye, EyeOff, AlertTriangle, Clock, Trash2 } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

const SecurityTab = ({
    seller,
    passwordForm,
    setPasswordForm,
    changingPassword,
    showCurrentPw,
    setShowCurrentPw,
    showNewPw,
    setShowNewPw,
    deleteDialogOpen,
    setDeleteDialogOpen,
    deletePassword,
    setDeletePassword,
    deleting,
    handleChangePassword,
    handleDeleteAccount,
}) => {
    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            <div>
                <h2 className="text-lg font-bold text-gray-900">Security & Password</h2>
                <p className="text-sm text-gray-500 mt-1">Keep your seller account secure.</p>
            </div>

            <div className="max-w-2xl space-y-8">
                {/* Change Password */}
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

                {/* Account Info */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="p-2 bg-emerald-50 rounded-lg">
                            <Clock className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">Account Information</h3>
                            <p className="text-xs text-gray-500">Key details about your seller account.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs font-medium text-gray-500 mb-1">Account Created</p>
                            <p className="text-sm font-semibold text-gray-900">
                                {seller?.createdAt ? new Date(seller.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A'}
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs font-medium text-gray-500 mb-1">Last Login</p>
                            <p className="text-sm font-semibold text-gray-900">
                                {seller?.lastLogin ? new Date(seller.lastLogin).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'First session'}
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs font-medium text-gray-500 mb-1">Email</p>
                            <p className="text-sm font-semibold text-gray-900">{seller?.email || 'N/A'}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs font-medium text-gray-500 mb-1">Store Name</p>
                            <p className="text-sm font-semibold text-gray-900">{seller?.storeName || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white border border-red-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-50 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-red-900">Danger Zone</h3>
                            <p className="text-xs text-red-600">Irreversible actions. Proceed with extreme caution.</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-red-50/50 rounded-lg border border-red-100">
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900">Delete Seller Account</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Permanently delete your account, store, and all associated data.</p>
                        </div>
                        <Dialog.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                            <Dialog.Trigger asChild>
                                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm shadow-sm">
                                    <Trash2 className="w-4 h-4" />
                                    Delete Account
                                </button>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
                                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] bg-white p-6 shadow-2xl rounded-2xl border border-gray-100 animate-in zoom-in-95 fade-in duration-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-red-100 rounded-full">
                                            <AlertTriangle className="w-5 h-5 text-red-600" />
                                        </div>
                                        <Dialog.Title className="text-lg font-bold text-gray-900">Delete Your Account?</Dialog.Title>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-5">
                                        This action is <strong>permanent and irreversible</strong>. All your products, orders, earnings data, and store information will be permanently deleted.
                                    </p>
                                    <div className="flex flex-col gap-1.5 mb-5">
                                        <label className="text-sm font-medium text-gray-700">Enter your password to confirm</label>
                                        <input
                                            type="password"
                                            value={deletePassword}
                                            onChange={(e) => setDeletePassword(e.target.value)}
                                            placeholder="Your current password"
                                            className="flex h-10 w-full rounded-lg border border-red-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow bg-red-50/30"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-3">
                                        <Dialog.Close asChild>
                                            <button className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                                Cancel
                                            </button>
                                        </Dialog.Close>
                                        <button
                                            onClick={handleDeleteAccount}
                                            disabled={deleting}
                                            className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50"
                                        >
                                            {deleting ? 'Deleting...' : 'Permanently Delete'}
                                        </button>
                                    </div>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityTab;
