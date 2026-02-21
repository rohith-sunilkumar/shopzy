import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { IndianRupee, ShoppingBag, Package, TrendingUp, Wallet, Clock, CreditCard, Loader2 } from 'lucide-react';
import useOverviewController from '../../../controllers/useOverviewController';
import OverviewAlerts from '../../components/seller/OverviewAlerts';
import SalesChart from '../../components/seller/SalesChart';
import TopProducts from '../../components/seller/TopProducts';

const StatCard = ({ title, value, icon: Icon, data }) => {
    const color = '#16a34a';
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md group">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <div className="flex items-end justify-between">
                <div>
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-bold text-gray-900">{value}</span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">From your store</p>
                </div>
                {data && data.length > 0 && (
                    <div className="w-16 h-10 opacity-60 group-hover:opacity-100 transition-opacity">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2.5} dot={false} isAnimationActive={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

const Overview = () => {
    const ctrl = useOverviewController();

    if (ctrl.loading) {
        return (
            <div className="p-6 md:p-10 flex items-center justify-center min-h-[500px]">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    if (!ctrl.dashboard) return null;

    const { stats, alerts, earnings, chart, topProducts } = ctrl.dashboard;
    const sparkRevenue = chart.revenue?.map(d => ({ v: d.value })) || [];
    const sparkOrders = chart.orders?.map(d => ({ v: d.value })) || [];

    return (
        <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Store Overview</h1>
                <p className="text-gray-500 mt-1">Here's what's happening with your store today.</p>
            </div>

            <OverviewAlerts alerts={alerts} />

            {/* Core Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={ctrl.formatCurrency(stats.totalRevenue)} icon={IndianRupee} data={sparkRevenue} />
                <StatCard title="Total Sales" value={stats.totalSales.toLocaleString()} icon={TrendingUp} data={sparkRevenue} />
                <StatCard title="Orders Count" value={stats.totalOrders.toLocaleString()} icon={ShoppingBag} data={sparkOrders} />
                <StatCard title="Pending Shipments" value={stats.pendingShipments.toLocaleString()} icon={Package} data={sparkOrders} />
            </div>

            {/* Earnings Snapshot */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gray-900 rounded-xl p-7 text-white shadow-lg relative overflow-hidden group border border-gray-800">
                    <div className="absolute right-0 top-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-125 duration-700"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                            <Wallet className="w-4 h-4" />
                            <h3 className="text-sm font-medium uppercase tracking-wider">Available Balance</h3>
                        </div>
                        <div className="text-4xl font-bold mb-6 tracking-tight">{ctrl.formatCurrency(earnings.availableBalance)}</div>
                        <button className="w-full bg-white text-gray-900 font-bold py-2.5 rounded-lg text-sm hover:bg-gray-100 hover:shadow-lg transition-all active:scale-[0.98]">Withdraw Funds</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm col-span-1 lg:col-span-2 flex flex-col sm:flex-row items-center justify-around gap-6 sm:gap-0">
                    <div className="text-center sm:text-left flex-1 px-4">
                        <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 mb-2">
                            <Clock className="w-4 h-4 text-amber-500" />
                            <h3 className="text-sm font-medium">Pending Clearance</h3>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{ctrl.formatCurrency(earnings.pendingClearance)}</div>
                        <div className="text-xs text-gray-500 mt-1 font-medium bg-amber-50 text-amber-700 inline-block px-2 py-0.5 rounded-md border border-amber-200">Processing</div>
                    </div>
                    <div className="w-full sm:w-px h-px sm:h-16 bg-gray-100"></div>
                    <div className="text-center sm:text-left flex-1 px-4">
                        <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 mb-2">
                            <CreditCard className="w-4 h-4 text-blue-500" />
                            <h3 className="text-sm font-medium">Total Orders</h3>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stats.totalOrders}</div>
                        <div className="text-xs text-gray-500 mt-1 font-medium">All time</div>
                    </div>
                </div>
            </div>

            {/* Charts and Top Products */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <SalesChart
                    chart={chart}
                    chartView={ctrl.chartView}
                    setChartView={ctrl.setChartView}
                    selectedRange={ctrl.selectedRange}
                    setSelectedRange={ctrl.setSelectedRange}
                    isCustomRangeOpen={ctrl.isCustomRangeOpen}
                    setIsCustomRangeOpen={ctrl.setIsCustomRangeOpen}
                    startDate={ctrl.startDate}
                    setStartDate={ctrl.setStartDate}
                    endDate={ctrl.endDate}
                    setEndDate={ctrl.setEndDate}
                />
                <TopProducts topProducts={topProducts} formatCurrency={ctrl.formatCurrency} />
            </div>
        </div>
    );
};

export default Overview;
