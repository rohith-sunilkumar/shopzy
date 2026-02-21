import { useState, useEffect } from 'react';
import { useSellerAuth } from '../models/SellerAuthContext';

const useOverviewController = () => {
    const { sellerApi } = useSellerAuth();
    const [loading, setLoading] = useState(true);
    const [dashboard, setDashboard] = useState(null);
    const [selectedRange, setSelectedRange] = useState('Last 7 days');
    const [isCustomRangeOpen, setIsCustomRangeOpen] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [chartView, setChartView] = useState('revenue');

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            const response = await sellerApi.get('/dashboard');
            setDashboard(response.data);
        } catch (error) {
            console.error('Failed to fetch dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return `₹${Number(amount || 0).toLocaleString('en-IN')}`;
    };

    return {
        loading,
        dashboard,
        selectedRange,
        setSelectedRange,
        isCustomRangeOpen,
        setIsCustomRangeOpen,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        chartView,
        setChartView,
        formatCurrency,
    };
};

export default useOverviewController;
