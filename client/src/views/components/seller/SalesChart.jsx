import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronLeft, ChevronRight, Calendar, X } from 'lucide-react';
import { DropdownMenu } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const MiniCalendar = ({ selected, onSelect, onOpenChange }) => {
    const today = new Date();
    const [viewMonth, setViewMonth] = useState(selected ? selected.getMonth() : today.getMonth());
    const [viewYear, setViewYear] = useState(selected ? selected.getFullYear() : today.getFullYear());

    const calendarDays = useMemo(() => {
        const firstDay = new Date(viewYear, viewMonth, 1).getDay();
        const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
        const prevDays = new Date(viewYear, viewMonth, 0).getDate();
        const days = [];
        for (let i = firstDay - 1; i >= 0; i--) days.push({ day: prevDays - i, current: false });
        for (let i = 1; i <= daysInMonth; i++) days.push({ day: i, current: true });
        const remaining = 42 - days.length;
        for (let i = 1; i <= remaining; i++) days.push({ day: i, current: false });
        return days;
    }, [viewMonth, viewYear]);

    const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
    const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };
    const isSelected = (day, current) => selected && current && selected.getDate() === day && selected.getMonth() === viewMonth && selected.getFullYear() === viewYear;
    const isToday = (day, current) => current && today.getDate() === day && today.getMonth() === viewMonth && today.getFullYear() === viewYear;

    return (
        <div className="w-[280px] p-3">
            <div className="flex items-center justify-between mb-3">
                <button onClick={prevMonth} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"><ChevronLeft className="w-4 h-4 text-gray-600" /></button>
                <span className="text-sm font-semibold text-gray-900">{MONTHS[viewMonth]} {viewYear}</span>
                <button onClick={nextMonth} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"><ChevronRight className="w-4 h-4 text-gray-600" /></button>
            </div>
            <div className="grid grid-cols-7 mb-1">
                {DAYS.map(d => <div key={d} className="text-center text-[11px] font-semibold text-gray-400 py-1">{d}</div>)}
            </div>
            <div className="grid grid-cols-7">
                {calendarDays.map((d, i) => (
                    <button key={i} onClick={() => { if (d.current) { onSelect(new Date(viewYear, viewMonth, d.day)); onOpenChange(false); } }}
                        className={`w-9 h-9 rounded-lg text-sm flex items-center justify-center transition-all
                            ${!d.current ? 'text-gray-300 cursor-default' : 'hover:bg-blue-50 hover:text-blue-600 cursor-pointer'}
                            ${isSelected(d.day, d.current) ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white font-bold' : ''}
                            ${isToday(d.day, d.current) && !isSelected(d.day, d.current) ? 'font-bold text-blue-600 ring-1 ring-blue-200' : ''}
                        `}>{d.day}</button>
                ))}
            </div>
        </div>
    );
};

const DatePickerField = ({ label, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const formatted = value ? value.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">{label}</label>
            <Popover.Root open={open} onOpenChange={setOpen}>
                <Popover.Trigger asChild>
                    <button className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all flex items-center justify-between hover:border-gray-300">
                        <span className={value ? 'text-gray-900 font-medium' : 'text-gray-400'}>{formatted || 'Pick a date'}</span>
                        <Calendar className="w-4 h-4 text-gray-400" />
                    </button>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content className="bg-white rounded-xl border border-gray-200 shadow-xl z-[100] animate-in fade-in zoom-in-95 duration-150" sideOffset={4} align="start">
                        <MiniCalendar selected={value} onSelect={onChange} onOpenChange={setOpen} />
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        </div>
    );
};

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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-bold text-gray-900">Sales Analytics</h2>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setChartView('revenue')}
                            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${chartView === 'revenue' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >Revenue</button>
                        <button
                            onClick={() => setChartView('orders')}
                            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${chartView === 'orders' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >Orders</button>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <button className="w-full sm:w-auto flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors outline-none cursor-pointer shadow-sm min-w-[140px] justify-between">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    {selectedRange}
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content variant="soft" className="z-40">
                            <DropdownMenu.Item onClick={() => setSelectedRange('Last 7 days')}>Last 7 days</DropdownMenu.Item>
                            <DropdownMenu.Item onClick={() => setSelectedRange('Last 30 days')}>Last 30 days</DropdownMenu.Item>
                            <DropdownMenu.Item onClick={() => setSelectedRange('This Year')}>This Year</DropdownMenu.Item>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item color="blue" onClick={() => setIsCustomRangeOpen(true)}>
                                Custom Range...
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>

                    <Dialog.Root open={isCustomRangeOpen} onOpenChange={setIsCustomRangeOpen}>
                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in" />
                            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-2xl z-50 w-full max-w-sm border border-gray-100 animate-in zoom-in duration-200">
                                <div className="flex items-center justify-between mb-6">
                                    <Dialog.Title className="text-xl font-bold text-gray-900">Custom Date Range</Dialog.Title>
                                    <Dialog.Close asChild>
                                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"><X className="w-5 h-5" /></button>
                                    </Dialog.Close>
                                </div>
                                <div className="space-y-4">
                                    <DatePickerField label="Start Date" value={startDate} onChange={setStartDate} />
                                    <DatePickerField label="End Date" value={endDate} onChange={setEndDate} />
                                </div>
                                <div className="mt-8 flex gap-3">
                                    <Dialog.Close asChild>
                                        <button className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
                                    </Dialog.Close>
                                    <Dialog.Close asChild onClick={() => setSelectedRange('Custom Range')}>
                                        <button className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-blue-200 shadow-lg">Apply Range</button>
                                    </Dialog.Close>
                                </div>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>
            </div>

            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
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
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesChart;
