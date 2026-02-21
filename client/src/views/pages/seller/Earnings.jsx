import React from 'react';
import { IndianRupee, Wallet, ArrowUpRight, ArrowDownRight, Clock, Loader2 } from 'lucide-react';
import useEarningsController from '../../../controllers/useEarningsController';
import WithdrawalDialog from '../../components/seller/WithdrawalDialog';
import TransactionHistory from '../../components/seller/TransactionHistory';

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
    const ctrl = useEarningsController();

    if (ctrl.loading) {
        return (
            <div className="p-6 md:p-10 flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Earnings & Payments</h1>
                    <p className="text-gray-500 mt-1">Manage your revenue, commissions, and payouts.</p>
                </div>

                <WithdrawalDialog
                    dialogOpen={ctrl.dialogOpen}
                    setDialogOpen={ctrl.setDialogOpen}
                    summary={ctrl.summary}
                    withdrawAmount={ctrl.withdrawAmount}
                    setWithdrawAmount={ctrl.setWithdrawAmount}
                    withdrawing={ctrl.withdrawing}
                    handleWithdraw={ctrl.handleWithdraw}
                    formatCurrency={ctrl.formatCurrency}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Earnings" value={ctrl.formatCurrency(ctrl.summary.totalEarnings)} subtitle="Lifetime earnings" icon={IndianRupee} />
                <StatCard title="Available to Withdraw" value={ctrl.formatCurrency(ctrl.summary.availableToWithdraw)} subtitle="Ready for payout" icon={Wallet} />
                <StatCard title="Pending Clearance" value={ctrl.formatCurrency(ctrl.summary.pendingClearance)} subtitle="Clears in 3-5 days" icon={Clock} />
            </div>

            <TransactionHistory
                transactions={ctrl.transactions}
                formatDate={ctrl.formatDate}
                formatAmount={ctrl.formatAmount}
                formatFee={ctrl.formatFee}
            />
        </div>
    );
};

export default Earnings;
