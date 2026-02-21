import React, { useState } from 'react';
import { MoreHorizontal, Printer, Truck, ExternalLink } from 'lucide-react';
import { DropdownMenu } from '@radix-ui/themes';
import * as Select from '@radix-ui/react-select';

const initialOrders = [
    { id: '#ORD-7352', customer: 'Alex Johnson', date: 'Oct 24, 2026', total: '$124.99', status: 'Processing' },
    { id: '#ORD-7351', customer: 'Sarah Smith', date: 'Oct 23, 2026', total: '$45.00', status: 'Shipped' },
    { id: '#ORD-7350', customer: 'Michael Brown', date: 'Oct 22, 2026', total: '$299.99', status: 'Delivered' },
    { id: '#ORD-7349', customer: 'Emily Davis', date: 'Oct 20, 2026', total: '$89.50', status: 'Cancelled' },
];

const statusColors = {
    'Pending': 'text-yellow-700 bg-yellow-100',
    'Processing': 'text-blue-700 bg-blue-100',
    'Shipped': 'text-indigo-700 bg-indigo-100',
    'Delivered': 'text-green-700 bg-green-100',
    'Cancelled': 'text-red-700 bg-red-100'
};

const Orders = () => {
    const [orders, setOrders] = useState(initialOrders);

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    return (
        <div className="p-6 md:p-10 space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
                <p className="text-gray-500 mt-1">View and manage your customer orders.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-medium tracking-wider">Order ID</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Customer</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Date</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Total</th>
                                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right font-medium tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-blue-600">{order.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{order.customer}</td>
                                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4 text-gray-900 font-medium">{order.total}</td>
                                    <td className="px-6 py-4">
                                        <Select.Root value={order.status} onValueChange={(val) => handleStatusChange(order.id, val)}>
                                            <Select.Trigger className={`inline-flex items-center justify-between rounded-full px-3 py-1 text-xs font-semibold outline-none hover:bg-opacity-80 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${statusColors[order.status] || 'text-gray-700 bg-gray-100'}`}>
                                                <Select.Value />
                                            </Select.Trigger>
                                            <Select.Portal>
                                                <Select.Content position="popper" sideOffset={4} className="z-50 min-w-[120px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2">
                                                    <Select.Viewport className="p-1">
                                                        {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                                                            <Select.Item key={status} value={status} className="relative flex w-full cursor-pointer select-none items-center rounded-md py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-gray-900">
                                                                <Select.ItemText>{status}</Select.ItemText>
                                                            </Select.Item>
                                                        ))}
                                                    </Select.Viewport>
                                                </Select.Content>
                                            </Select.Portal>
                                        </Select.Root>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <DropdownMenu.Root>
                                            <DropdownMenu.Trigger asChild>
                                                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors cursor-pointer outline-none">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </DropdownMenu.Trigger>
                                            <DropdownMenu.Content variant="soft" color="indigo" highContrast>
                                                <DropdownMenu.Item shortcut="⌘ V">
                                                    <div className="flex items-center">
                                                        <ExternalLink className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </div>
                                                </DropdownMenu.Item>
                                                <DropdownMenu.Item shortcut="⌘ P">
                                                    <div className="flex items-center">
                                                        <Printer className="mr-2 h-4 w-4" />
                                                        Print Invoice
                                                    </div>
                                                </DropdownMenu.Item>
                                                <DropdownMenu.Item shortcut="⌘ T">
                                                    <div className="flex items-center">
                                                        <Truck className="mr-2 h-4 w-4" />
                                                        Track Shipment
                                                    </div>
                                                </DropdownMenu.Item>
                                            </DropdownMenu.Content>
                                        </DropdownMenu.Root>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
