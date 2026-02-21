import { useState, useEffect } from 'react';
import { useSellerAuth } from '../models/SellerAuthContext';
import { toast } from 'react-hot-toast';

const useEarningsController = () => {
    const { sellerApi } = useSellerAuth();
    const [summary, setSummary] = useState({ totalEarnings: 0, availableToWithdraw: 0, pendingClearance: 0 });
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawing, setWithdrawing] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        fetchEarnings();
    }, []);

    const fetchEarnings = async () => {
        try {
            setLoading(true);
            const response = await sellerApi.get('/earnings');
            setSummary(response.data.summary);
            setTransactions(response.data.transactions);
        } catch (error) {
            console.error('Failed to fetch earnings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async () => {
        const amount = parseFloat(withdrawAmount);
        if (!amount || amount <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }
        if (amount > summary.availableToWithdraw) {
            toast.error('Amount exceeds available balance');
            return;
        }

        try {
            setWithdrawing(true);
            await sellerApi.post('/earnings/withdraw', { amount });
            toast.success('Withdrawal request submitted!');
            setDialogOpen(false);
            setWithdrawAmount('');
            fetchEarnings(); // Refresh data
        } catch (error) {
            toast.error(error.response?.data?.message || 'Withdrawal failed');
        } finally {
            setWithdrawing(false);
        }
    };

    const formatCurrency = (amount) => {
        return `₹${Number(amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatAmount = (trx) => {
        const prefix = trx.type === 'Withdrawal' ? '-' : '+';
        return `${prefix}₹${Number(trx.amount).toFixed(2)}`;
    };

    const formatFee = (fee) => {
        if (!fee || fee === 0) return '₹0.00';
        return `-₹${Number(fee).toFixed(2)}`;
    };

    return {
        summary,
        transactions,
        loading,
        withdrawAmount,
        setWithdrawAmount,
        withdrawing,
        dialogOpen,
        setDialogOpen,
        handleWithdraw,
        formatCurrency,
        formatDate,
        formatAmount,
        formatFee
    };
};

export default useEarningsController;
