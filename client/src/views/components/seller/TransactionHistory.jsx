import React from 'react';
import { Receipt } from 'lucide-react';

const TransactionHistory = ({ transactions, formatDate, formatAmount, formatFee }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Transaction History</h2>
            </div>
            {transactions.length === 0 ? (
                <div className="p-12 text-center">
                    <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-base font-semibold text-gray-600 mb-1">No transactions yet</h3>
                    <p className="text-sm text-gray-400">Your transaction history will appear here.</p>
                </div>
            ) : (
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
                                <tr key={trx._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{trx.transactionId}</td>
                                    <td className="px-6 py-4 text-gray-500">{formatDate(trx.createdAt)}</td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-gray-700">{trx.type}</span>
                                    </td>
                                    <td className={`px-6 py-4 font-medium ${trx.type !== 'Withdrawal' ? 'text-green-600' : 'text-gray-900'}`}>
                                        {formatAmount(trx)}
                                    </td>
                                    <td className="px-6 py-4 text-red-500">{formatFee(trx.platformFee)}</td>
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
            )}
        </div>
    );
};

export default TransactionHistory;
