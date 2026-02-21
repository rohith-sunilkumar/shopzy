import React from 'react';
import { Wallet } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

const WithdrawalDialog = ({
    dialogOpen,
    setDialogOpen,
    summary,
    withdrawAmount,
    setWithdrawAmount,
    withdrawing,
    handleWithdraw,
    formatCurrency
}) => {
    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm">
                    <Wallet className="w-4 h-4" />
                    Request Payout
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-200 bg-white p-6 shadow-xl sm:rounded-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%]">
                    <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                        <Dialog.Title className="text-xl font-semibold leading-none tracking-tight text-gray-900">Withdraw Funds</Dialog.Title>
                        <Dialog.Description className="text-sm text-gray-500 mt-2">
                            Available balance: <span className="font-semibold text-gray-900">{formatCurrency(summary.availableToWithdraw)}</span>
                        </Dialog.Description>
                    </div>
                    <div className="py-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="amount" className="text-sm font-medium text-gray-700">Amount to Withdraw</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                <input
                                    id="amount"
                                    type="number"
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent pl-7 pr-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                        <Dialog.Close asChild>
                            <button className="mt-2 sm:mt-0 inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">Cancel</button>
                        </Dialog.Close>
                        <button
                            onClick={handleWithdraw}
                            disabled={withdrawing}
                            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
                        >
                            {withdrawing ? 'Processing...' : 'Confirm Withdrawal'}
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default WithdrawalDialog;
