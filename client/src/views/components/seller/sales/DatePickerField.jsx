import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Calendar } from 'lucide-react';
import MiniCalendar from '../MiniCalendar';

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
                        <MiniCalendar selected={value} onSelect={onChange} onClose={() => setOpen(false)} />
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        </div>
    );
};

export default DatePickerField;
