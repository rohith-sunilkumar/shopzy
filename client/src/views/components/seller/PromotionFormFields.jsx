import React from 'react';
import { ChevronDown, Check, Calendar } from 'lucide-react';
import * as Select from '@radix-ui/react-select';
import * as Popover from '@radix-ui/react-popover';
import MiniCalendar from './MiniCalendar';

const PromotionFormFields = ({ form, setForm }) => {
    return (
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
    );
};

export default PromotionFormFields;
