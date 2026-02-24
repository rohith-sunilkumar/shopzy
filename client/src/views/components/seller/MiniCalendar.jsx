import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

export default MiniCalendar;
