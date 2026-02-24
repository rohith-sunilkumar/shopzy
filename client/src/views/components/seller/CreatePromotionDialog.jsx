import React from 'react';
import { Plus, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import PromotionFormFields from './PromotionFormFields';

const CreatePromotionDialog = ({ dialogOpen, setDialogOpen, form, setForm, creating, handleCreate }) => {
    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm">
                    <Plus className="w-4 h-4" />
                    Create Promotion
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border border-gray-100 bg-white p-0 shadow-2xl rounded-2xl animate-in zoom-in-95 fade-in duration-200">
                    <div className="flex items-center justify-between p-6 pb-0">
                        <Dialog.Title className="text-xl font-bold text-gray-900">New Promotion</Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </Dialog.Close>
                    </div>

                    <PromotionFormFields form={form} setForm={setForm} />

                    <div className="flex justify-end gap-3 p-6 pt-0">
                        <Dialog.Close asChild>
                            <button className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                        </Dialog.Close>
                        <button
                            onClick={handleCreate}
                            disabled={creating}
                            className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                        >
                            {creating ? 'Creating...' : 'Create Promotion'}
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default CreatePromotionDialog;
