import React from 'react';
import { DropdownMenu } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { Calendar, ChevronDown, X } from 'lucide-react';
import DatePickerField from './DatePickerField';

const ChartControls = ({
    chartView,
    setChartView,
    selectedRange,
    setSelectedRange,
    isCustomRangeOpen,
    setIsCustomRangeOpen,
    startDate,
    setStartDate,
    endDate,
    setEndDate
}) => {
    return (
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
                    <DropdownMenu.Trigger asChild>
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
    );
};

export default ChartControls;
