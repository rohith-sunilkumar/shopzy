import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChartWrapper from '../ChartWrapper';
import CustomTooltip from './sales/CustomTooltip';
import ChartControls from './sales/ChartControls';

const SalesChart = ({
    chart,
    chartView,
    setChartView,
    selectedRange,
    setSelectedRange,
    isCustomRangeOpen,
    setIsCustomRangeOpen,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
}) => {
    const currentChartData = chartView === 'revenue' ? (chart.revenue || []) : (chart.orders || []);
    const isRevenue = chartView === 'revenue';

    return (
        <div className="xl:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <ChartControls
                chartView={chartView}
                setChartView={setChartView}
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
                isCustomRangeOpen={isCustomRangeOpen}
                setIsCustomRangeOpen={setIsCustomRangeOpen}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />

            <ChartWrapper height={350}>
                <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={isRevenue ? "#3b82f6" : "#8b5cf6"} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={isRevenue ? "#3b82f6" : "#8b5cf6"} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip isRevenue={isRevenue} />} />
                    <Area type="monotone" dataKey="value" stroke={isRevenue ? "#3b82f6" : "#8b5cf6"} strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" animationDuration={1500} />
                </AreaChart>
            </ChartWrapper>
        </div>
    );
};

export default SalesChart;
