import React, { useState, useEffect, useRef } from 'react';
import { ResponsiveContainer } from 'recharts';

/**
 * ChartWrapper guarantees a stable container for Recharts ResponsiveContainer.
 * Passes explicit pixel dimensions to avoid "width(-1) and height(-1)" warnings.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The rechart element (AreaChart, LineChart, etc.)
 * @param {string|number} props.height - The height of the container (default: 300)
 * @param {string|number} props.minHeight - Minimum height (optional)
 * @param {string} props.className - Additional tailwind classes
 */
const ChartWrapper = ({ children, height = 300, minHeight, className = "" }) => {
    const [dims, setDims] = useState({ width: 0, height: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const update = () => {
            const w = el.offsetWidth;
            const h = el.offsetHeight;
            if (w > 0 && h > 0) {
                setDims({ width: w, height: h });
            }
        };

        update();
        const observer = new ResizeObserver(update);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const containerStyle = {
        height: typeof height === 'number' ? `${height}px` : height,
        minHeight: minHeight ? (typeof minHeight === 'number' ? `${minHeight}px` : minHeight) : undefined,
        width: '100%',
    };

    return (
        <div
            ref={containerRef}
            className={`w-full relative overflow-hidden ${className}`}
            style={containerStyle}
        >
            {dims.width > 0 && dims.height > 0 && (
                <ResponsiveContainer width={dims.width} height={dims.height}>
                    {children}
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default ChartWrapper;
