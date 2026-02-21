import React, { useState, useMemo } from 'react';
import { Plus, X, ChevronDown, ChevronLeft, ChevronRight, Check, Calendar } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import * as Popover from '@radix-ui/react-popover';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const MiniCalendar = ({ selected, onSelect, onClose }) => {
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
                <button onClick={prevMonth} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"><ChevronLeft className="w-4 h-4 text-gray-600" /></button>
                <span className="text-sm font-semibold text-gray-900">{MONTH_NAMES[viewMonth]} {viewYear}</span>
                <button onClick={nextMonth} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"><ChevronRight className="w-4 h-4 text-gray-600" /></button>
            </div>
            <div className="grid grid-cols-7 mb-1">
                {DAY_LABELS.map(d => <div key={d} className="text-center text-[11px] font-semibold text-gray-400 py-1">{d}</div>)}
            </div>
            <div className="grid grid-cols-7">
                {calendarDays.map((d, i) => (
                    <button key={i} onClick={() => { if (d.current) { onSelect(new Date(viewYear, viewMonth, d.day)); onClose(); } }}
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

const CreatePromotionDialog = ({ dialogOpen, setDialogOpen, form, setForm, creating, handleCreate }) => {
    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm">
                    <Plus className="w-4 h-4" />
                    Create Promotion
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border border-gray-100 bg-white p-0 shadow-2xl rounded-2xl animate-in zoom-in-95 fade-in duration-200">
                    <div className="flex items-center justify-between p-6 pb-0">
                        <Dialog.Title className="text-xl font-bold text-gray-900">New Promotion</Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </Dialog.Close>
                    </div>

                    <div className="p-6 space-y-5">
                        {/* Type Selector */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Promotion Type</label>
                            <Select.Root value={form.type} onValueChange={(val) => setForm(prev => ({ ...prev, type: val }))}>
                                <Select.Trigger className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow">
                                    <Select.Value />
                                    <Select.Icon><ChevronDown className="w-4 h-4 text-gray-400" /></Select.Icon>
                                </Select.Trigger>
                                <Select.Portal>
                                    <Select.Content className="bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-150" position="popper" sideOffset={4}>
                                        <Select.Viewport className="p-1.5">
                                            <Select.Item value="discount" className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg cursor-pointer outline-none data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-700 transition-colors">
                                                <Select.ItemIndicator className="w-4"><Check className="w-4 h-4 text-blue-600" /></Select.ItemIndicator>
                                                <Select.ItemText>Discount (% off)</Select.ItemText>
                                            </Select.Item>
                                            <Select.Item value="coupon" className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg cursor-pointer outline-none data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-700 transition-colors">
                                                <Select.ItemIndicator className="w-4"><Check className="w-4 h-4 text-blue-600" /></Select.ItemIndicator>
                                                <Select.ItemText>Coupon Code</Select.ItemText>
                                            </Select.Item>
                                        </Select.Viewport>
                                    </Select.Content>
                                </Select.Portal>
                            </Select.Root>
                        </div>

                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Promotion Name</label>
                            <input
                                value={form.name}
                                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                                className="flex h-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                placeholder="e.g. Summer Sale"
                            />
                        </div>

                        {/* Type-specific fields */}
                        {form.type === 'discount' ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-700">Discount %</label>
                                    <input
                                        type="number"
                                        value={form.discountPercent}
                                        onChange={(e) => setForm(prev => ({ ...prev, discountPercent: e.target.value }))}
                                        className="flex h-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                        placeholder="20"
                                        min="1" max="100"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-700">Applies To</label>
                                    <input
                                        value={form.appliesTo}
                                        onChange={(e) => setForm(prev => ({ ...prev, appliesTo: e.target.value }))}
                                        className="flex h-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                        placeholder="All Products"
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-gray-700">Coupon Code</label>
                                        <input
                                            value={form.couponCode}
                                            onChange={(e) => setForm(prev => ({ ...prev, couponCode: e.target.value.toUpperCase() }))}
                                            className="flex h-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                            placeholder="WELCOME20"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-gray-700">Discount Value (₹)</label>
                                        <input
                                            type="number"
                                            value={form.discountValue}
                                            onChange={(e) => setForm(prev => ({ ...prev, discountValue: e.target.value }))}
                                            className="flex h-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                            placeholder="100"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-gray-700">Min Order Amount (₹)</label>
                                    <input
                                        type="number"
                                        value={form.minOrderAmount}
                                        onChange={(e) => setForm(prev => ({ ...prev, minOrderAmount: e.target.value }))}
                                        className="flex h-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                        placeholder="500"
                                    />
                                </div>
                            </>
                        )}

                        {/* End Date */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">End Date <span className="text-gray-400 font-normal">(optional)</span></label>
                            <Popover.Root>
                                <Popover.Trigger asChild>
                                    <button className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-left hover:border-gray-400">
                                        <span className={form.endDate ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                                            {form.endDate
                                                ? new Date(form.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                                                : 'Pick a date'}
                                        </span>
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                    </button>
                                </Popover.Trigger>
                                <Popover.Portal>
                                    <Popover.Content
                                        className="bg-white rounded-xl border border-gray-200 shadow-xl z-[200] animate-in fade-in zoom-in-95 duration-150"
                                        sideOffset={4}
                                        align="start"
                                    >
                                        <MiniCalendar
                                            selected={form.endDate ? new Date(form.endDate) : null}
                                            onSelect={(date) => {
                                                const yyyy = date.getFullYear();
                                                const mm = String(date.getMonth() + 1).padStart(2, '0');
                                                const dd = String(date.getDate()).padStart(2, '0');
                                                setForm(prev => ({ ...prev, endDate: `${yyyy}-${mm}-${dd}` }));
                                            }}
                                            onClose={() => { }}
                                        />
                                    </Popover.Content>
                                </Popover.Portal>
                            </Popover.Root>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 p-6 pt-0">
                        <Dialog.Close asChild>
                            <button className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                        </Dialog.Close>
                        <button
                            onClick={handleCreate}
                            disabled={creating}
                            className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                        >
                            {creating ? 'Creating...' : 'Create Promotion'}
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default CreatePromotionDialog;
