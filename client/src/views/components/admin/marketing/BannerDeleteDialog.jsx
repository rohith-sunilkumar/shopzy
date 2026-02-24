import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { AlertCircle } from 'lucide-react';

const BannerDeleteDialog = ({ bannerToDelete, setBannerToDelete, confirmDelete }) => {
    return (
        <AlertDialog.Root open={!!bannerToDelete} onOpenChange={(open) => !open && setBannerToDelete(null)}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <AlertDialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-800 bg-slate-900 p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl">
                    <div className="flex flex-col gap-2 text-center sm:text-left">
                        <AlertDialog.Title className="text-xl font-bold text-white flex items-center gap-2">
                            <AlertCircle className="w-6 h-6 text-rose-500" />
                            Delete Banner
                        </AlertDialog.Title>
                        <AlertDialog.Description className="text-slate-400 font-medium">
                            Are you sure you want to delete this banner? This action cannot be undone and it will be permanently removed from the homepage carousel.
                        </AlertDialog.Description>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-4">
                        <AlertDialog.Cancel asChild>
                            <button className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors">
                                Cancel
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button
                                onClick={confirmDelete}
                                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/20 transition-all active:scale-[0.98]"
                            >
                                Yes, Delete Banner
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};

export default BannerDeleteDialog;
