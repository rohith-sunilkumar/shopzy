import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAdminAuth } from '../models/AdminAuthContext';

const useDashboardController = () => {
    const { adminApi } = useAdminAuth();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalSellers: 0,
        recentUsers: [],
        chartData: [],
        weeklyRevenue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const fetchStats = async () => {
            try {
                const res = await adminApi.get('/stats', { signal: controller.signal });
                setStats(res.data);
            } catch (error) {
                if (error.name === 'CanceledError' || error.name === 'AbortError') return;
                toast.error("Failed to load dashboard statistics");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
        return () => controller.abort();
    }, [adminApi]);

    return { stats, loading };
};

export default useDashboardController;
