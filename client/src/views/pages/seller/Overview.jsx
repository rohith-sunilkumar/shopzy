import React, { useState, useMemo } from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IndianRupee, ShoppingBag, Package, TrendingUp, ChevronDown, ChevronLeft, ChevronRight, Calendar, X, AlertTriangle, MessageCircle, ArrowRight, Wallet, Clock, CreditCard, Star, Flame } from 'lucide-react';
import { DropdownMenu } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';

const dataRevenue = [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 2000 },
    { name: 'Thu', value: 2780 },
    { name: 'Fri', value: 1890 },
    { name: 'Sat', value: 2390 },
    { name: 'Sun', value: 3490 },
];

const dataOrders = [
    { name: 'Mon', value: 120 },
    { name: 'Tue', value: 98 },
    { name: 'Wed', value: 86 },
    { name: 'Thu', value: 105 },
    { name: 'Fri', value: 130 },
    { name: 'Sat', value: 180 },
    { name: 'Sun', value: 210 },
];

const sparklines = {
    revenue: [{ v: 40 }, { v: 30 }, { v: 45 }, { v: 50 }, { v: 65 }, { v: 55 }, { v: 70 }],
    sales: [{ v: 20 }, { v: 25 }, { v: 35 }, { v: 30 }, { v: 40 }, { v: 45 }, { v: 50 }],
    orders: [{ v: 80 }, { v: 75 }, { v: 70 }, { v: 85 }, { v: 65 }, { v: 60 }, { v: 55 }],
    pending: [{ v: 10 }, { v: 15 }, { v: 12 }, { v: 20 }, { v: 18 }, { v: 25 }, { v: 28 }]
};

const topProducts = [
    { name: 'Wireless Noise Cancelling Headphones', sales: 124, revenue: '₹4,95,000' },
    { name: 'Ultra HD Smart TV 55"', sales: 56, revenue: '₹2,52,000' },
    { name: 'Mechanical Gaming Keyboard', sales: 89, revenue: '₹62,300' },
    { name: 'Ergonomic Office Chair', sales: 42, revenue: '₹41,500' },
];

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

        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({ day: prevDays - i, current: false });
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ day: i, current: true });
        }
        const remaining = 42 - days.length;
        for (let i = 1; i <= remaining; i++) {
            days.push({ day: i, current: false });
        }
        return days;
    }, [viewMonth, viewYear]);

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
        else setViewMonth(m => m - 1);
    };

    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
        else setViewMonth(m => m + 1);
    };

    const isSelected = (day, current) => {
        if (!selected || !current) return false;
        return selected.getDate() === day && selected.getMonth() === viewMonth && selected.getFullYear() === viewYear;
    };

    const isToday = (day, current) => {
        if (!current) return false;
        return today.getDate() === day && today.getMonth() === viewMonth && today.getFullYear() === viewYear;
    };

    return (
        <div className="w-[280px] p-3">
            <div className="flex items-center justify-between mb-3">
                <button onClick={prevMonth} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <span className="text-sm font-semibold text-gray-900">{MONTHS[viewMonth]} {viewYear}</span>
                <button onClick={nextMonth} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
            </div>
            <div className="grid grid-cols-7 mb-1">
                {DAYS.map(d => (
                    <div key={d} className="text-center text-[11px] font-semibold text-gray-400 py-1">{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7">
                {calendarDays.map((d, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (d.current) {
                                onSelect(new Date(viewYear, viewMonth, d.day));
                                onOpenChange(false);
                            }
                        }}
                        className={`w-9 h-9 rounded-lg text-sm flex items-center justify-center transition-all
                            ${!d.current ? 'text-gray-300 cursor-default' : 'hover:bg-blue-50 hover:text-blue-600 cursor-pointer'}
                            ${isSelected(d.day, d.current) ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white font-bold' : ''}
                            ${isToday(d.day, d.current) && !isSelected(d.day, d.current) ? 'font-bold text-blue-600 ring-1 ring-blue-200' : ''}
                        `}
                    >
                        {d.day}
                    </button>
                ))}
            </div>
        </div>
    );
};

const DatePickerField = ({ label, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const formatted = value ? `${value.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}` : '';

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
                    <Popover.Content
                        className="bg-white rounded-xl border border-gray-200 shadow-xl z-[100] animate-in fade-in zoom-in-95 duration-150"
                        sideOffset={4}
                        align="start"
                    >
                        <MiniCalendar selected={value} onSelect={onChange} onOpenChange={setOpen} />
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        </div>
    );
};

const StatCard = ({ title, value, icon: Icon, trend, data }) => {
    const isPositive = trend.startsWith('+');
    const color = isPositive ? '#16a34a' : '#ef4444'; // green-600 vs red-500
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
                        <span className={`text-sm font-bold ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                            {trend}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">Compared to last week</p>
                </div>
                {data && (
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

const Overview = () => {
    const [selectedRange, setSelectedRange] = useState('Last 7 days');
    const [isCustomRangeOpen, setIsCustomRangeOpen] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [chartView, setChartView] = useState('revenue'); // 'revenue' | 'orders'

    const currentChartData = chartView === 'revenue' ? dataRevenue : dataOrders;
    const isRevenue = chartView === 'revenue';

    return (
        <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Store Overview</h1>
                <p className="text-gray-500 mt-1">Here's what's happening with your store today.</p>
            </div>

            {/* Actionable Alerts Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 transition-colors hover:bg-amber-100">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-amber-800">3 Products Low in Stock</h4>
                        <p className="text-xs text-amber-700 mt-1">Check inventory to avoid missed sales.</p>
                    </div>
                    <button className="ml-auto text-xs font-bold text-amber-700 hover:text-amber-900 border border-amber-300 px-3 py-1.5 rounded-lg bg-white shadow-sm hover:shadow transition-all">View</button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 transition-colors hover:bg-blue-100">
                    <Package className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-blue-800">5 Pending Shipments</h4>
                        <p className="text-xs text-blue-700 mt-1">Orders waiting to be fulfilled today.</p>
                    </div>
                    <button className="ml-auto text-xs font-bold text-blue-700 hover:text-blue-900 border border-blue-300 px-3 py-1.5 rounded-lg bg-white shadow-sm hover:shadow transition-all">Ship</button>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 transition-colors hover:bg-emerald-100">
                    <Star className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 fill-emerald-600" />
                    <div>
                        <h4 className="text-sm font-bold text-emerald-800">2 New Reviews</h4>
                        <p className="text-xs text-emerald-700 mt-1">Respond to recent customer feedback.</p>
                    </div>
                    <button className="ml-auto text-xs font-bold text-emerald-700 hover:text-emerald-900 border border-emerald-300 px-3 py-1.5 rounded-lg bg-white shadow-sm hover:shadow transition-all">Reply</button>
                </div>
            </div>

            {/* Core Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value="₹45,231" icon={IndianRupee} trend="+20.1%" data={sparklines.revenue} />
                <StatCard title="Total Sales" value="2,345" icon={TrendingUp} trend="+15.2%" data={sparklines.sales} />
                <StatCard title="Orders Count" value="342" icon={ShoppingBag} trend="-4.1%" data={sparklines.orders} />
                <StatCard title="Pending Shipments" value="45" icon={Package} trend="+2.3%" data={sparklines.pending} />
            </div>

            {/* Enterprise Earnings Snapshot */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gray-900 rounded-xl p-7 text-white shadow-lg relative overflow-hidden group border border-gray-800">
                    <div className="absolute right-0 top-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-125 duration-700"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                            <Wallet className="w-4 h-4" />
                            <h3 className="text-sm font-medium uppercase tracking-wider">Available Balance</h3>
                        </div>
                        <div className="text-4xl font-bold mb-6 tracking-tight">₹12,450<span className="text-gray-400 text-2xl">.00</span></div>
                        <button className="w-full bg-white text-gray-900 font-bold py-2.5 rounded-lg text-sm hover:bg-gray-100 hover:shadow-lg transition-all active:scale-[0.98]">Withdraw Funds</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm col-span-1 lg:col-span-2 flex flex-col sm:flex-row items-center justify-around gap-6 sm:gap-0">
                    <div className="text-center sm:text-left flex-1 px-4">
                        <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 mb-2">
                            <Clock className="w-4 h-4 text-amber-500" />
                            <h3 className="text-sm font-medium">Pending Payout</h3>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">₹4,230<span className="text-gray-400 text-lg">.50</span></div>
                        <div className="text-xs text-gray-500 mt-1 font-medium bg-amber-50 text-amber-700 inline-block px-2 py-0.5 rounded-md border border-amber-200">Processing</div>
                    </div>
                    <div className="w-full sm:w-px h-px sm:h-16 bg-gray-100"></div>
                    <div className="text-center sm:text-left flex-1 px-4">
                        <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 mb-2">
                            <CreditCard className="w-4 h-4 text-blue-500" />
                            <h3 className="text-sm font-medium">Next Payout Date</h3>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">Oct 24, 2026</div>
                        <div className="text-xs text-gray-500 mt-1 font-medium">Automatic deposit</div>
                    </div>
                </div>
            </div>

            {/* Charts and Side Widgets */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-3">
                            <h2 className="text-lg font-bold text-gray-900">Sales Analytics</h2>

                            {/* Toggle Revenue | Orders */}
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setChartView('revenue')}
                                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${chartView === 'revenue' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Revenue
                                </button>
                                <button
                                    onClick={() => setChartView('orders')}
                                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${chartView === 'orders' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Orders
                                </button>
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
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke={isRevenue ? "#3b82f6" : "#8b5cf6"}
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Performing Products Sidebar */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                            Top Products
                        </h2>
                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">View All</button>
                    </div>

                    <div className="flex-1 space-y-4 flex flex-col">
                        {topProducts.map((product, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group cursor-pointer border border-transparent hover:border-gray-100">
                                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shrink-0">
                                    <Package className="w-6 h-6 text-gray-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{product.name}</h3>
                                    <p className="text-xs text-gray-500 mt-0.5 font-medium">{product.sales} sales • {product.revenue}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                        <button className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors flex items-center justify-center gap-2 w-full">
                            Report Details <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Overview;
