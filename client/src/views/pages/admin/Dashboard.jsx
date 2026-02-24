import React from 'react';
import useDashboardController from '../../../controllers/useDashboardController';
import DashboardStatsCards from '../../components/admin/dashboard/DashboardStatsCards';
import DashboardAnalyticsChart from '../../components/admin/dashboard/DashboardAnalyticsChart';
import RecentRegistrations from '../../components/admin/dashboard/RecentRegistrations';

const Dashboard = () => {
    const { stats, loading } = useDashboardController();

    return (
        <div>
            <h1 className="text-3xl font-black text-white mb-2">Control Dashboard</h1>
            <p className="text-slate-400 font-medium mb-8">Platform overview and general metrics</p>

            <DashboardStatsCards stats={stats} loading={loading} />

            {/* Detailed Analytics Grid */}
            <div className="grid grid-cols-1 gap-6">
                <DashboardAnalyticsChart stats={stats} loading={loading} />
                <RecentRegistrations stats={stats} loading={loading} />
            </div>
        </div>
    );
};

export default Dashboard;
