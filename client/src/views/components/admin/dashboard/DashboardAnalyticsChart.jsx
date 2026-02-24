import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Loader2 } from 'lucide-react';
import ChartWrapper from '../../ChartWrapper';

const DashboardAnalyticsChart = ({ stats, loading }) => {
    return (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 flex flex-col min-h-[400px]">
            <h2 className="text-xl font-bold text-white mb-6">Sales & Revenue Analytics (7 Days)</h2>
            <div className="flex-1 w-full relative">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                    </div>
                ) : (
                    <ChartWrapper height={400}>
                        <AreaChart data={stats.chartData || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis yAxisId="left" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                            <YAxis yAxisId="right" orientation="right" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                            <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                            <Area yAxisId="right" type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" name="Orders" />
                        </AreaChart>
                    </ChartWrapper>
                )}
            </div>
        </div>
    );
};

export default DashboardAnalyticsChart;
