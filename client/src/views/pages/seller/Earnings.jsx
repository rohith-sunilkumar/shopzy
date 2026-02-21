import React from 'react';
import { IndianRupee, Wallet, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

const transactions = [
    { id: '#TRX-1029', date: 'Oct 24, 2026', type: 'Sale', amount: '+₹124.99', fee: '-₹6.25', status: 'Completed' },
    { id: '#TRX-1028', date: 'Oct 23, 2026', type: 'Withdrawal', amount: '-₹500.00', fee: '₹0.00', status: 'Pending' },
    { id: '#TRX-1027', date: 'Oct 21, 2026', type: 'Sale', amount: '+₹89.50', fee: '-₹4.47', status: 'Completed' },
    { id: '#TRX-1026', date: 'Oct 19, 2026', type: 'Sale', amount: '+₹299.99', fee: '-₹15.00', status: 'Completed' },
];

const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendUp }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <div className="p-2 bg-green-50 text-green-600 rounded-xl">
                <Icon className="w-5 h-5" />
            </div>
        </div>
        <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold text-gray-900">{value}</span>
            <div className="flex items-center gap-2">
                {trend && (
                    <span className={`text-sm font-medium flex items-center ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                        {trendUp ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                        {trend}
                    </span>
                )}
                <span className="text-sm text-gray-500">{subtitle}</span>
            </div>
        </div>
    </div>
);

const Earnings = () => {
    return (
        <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Earnings & Payments</h1>
                    <p className="text-gray-500 mt-1">Manage your revenue, commissions, and payouts.</p>
                </div>

                <Dialog.Root>
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
                                    Available balance: <span className="font-semibold text-gray-900">₹3,450.00</span>
                                </Dialog.Description>
                            </div>
                            <div className="py-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="amount" className="text-sm font-medium text-gray-700">Amount to Withdraw</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                        <input id="amount" type="number" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent pl-7 pr-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0.00" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Transfers directly to your connected bank account ending in 4392.</p>
                                </div>
                            </div>
                            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                                <Dialog.Close asChild>
                                    <button className="mt-2 sm:mt-0 inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">Cancel</button>
                                </Dialog.Close>
                                <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">Confirm Withdrawal</button>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Earnings" value="₹12,450.00" subtitle="Lifetime earnings" icon={IndianRupee} trend="12%" trendUp={true} />
                <StatCard title="Available to Withdraw" value="₹3,450.00" subtitle="Ready for payout" icon={Wallet} />
                <StatCard title="Pending Clearance" value="₹845.00" subtitle="Clears in 3-5 days" icon={Clock} />
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Transaction History</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-medium tracking-wider">Transaction ID</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Date</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Type</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Amount</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Platform Fee</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {transactions.map((trx) => (
                                <tr key={trx.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{trx.id}</td>
                                    <td className="px-6 py-4 text-gray-500">{trx.date}</td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-gray-700">{trx.type}</span>
                                    </td>
                                    <td className={`px-6 py-4 font-medium ${trx.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'}`}>
                                        {trx.amount}
                                    </td>
                                    <td className="px-6 py-4 text-red-500">{trx.fee}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border
                      ${trx.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                                                'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                                            {trx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Earnings;
