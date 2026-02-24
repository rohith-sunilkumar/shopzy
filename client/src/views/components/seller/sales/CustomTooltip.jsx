import React from 'react';

const CustomTooltip = ({ active, payload, label, isRevenue }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-xl">
                <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
                <p className="text-lg font-bold text-gray-900 flex items-center gap-1">
                    {isRevenue && <span className="font-semibold">₹</span>}
                    {payload[0].value.toLocaleString('en-IN')}
                    {!isRevenue && <span className="text-sm text-gray-500 font-medium ml-1">orders</span>}
                </p>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;
