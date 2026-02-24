import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

const DangerZoneSection = ({
    deleteDialogOpen,
    setDeleteDialogOpen,
    deletePassword,
    setDeletePassword,
    deleting,
    handleDeleteAccount
}) => {
    return (
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
    );
};

export default DangerZoneSection;
