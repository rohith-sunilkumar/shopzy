import React, { useState, useEffect } from 'react';
import { MoreHorizontal, Printer, Truck, ExternalLink, Loader2, PackageX } from 'lucide-react';
import { DropdownMenu } from '@radix-ui/themes';
import * as Select from '@radix-ui/react-select';
import { useSellerAuth } from '../../../models/SellerAuthContext';

const statusColors = {
    'Pending': 'text-yellow-700 bg-yellow-100',
    'Processing': 'text-blue-700 bg-blue-100',
    'Shipped': 'text-indigo-700 bg-indigo-100',
    'Delivered': 'text-green-700 bg-green-100',
    'Cancelled': 'text-red-700 bg-red-100'
};

const Orders = () => {
    const { sellerApi } = useSellerAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await sellerApi.get('/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        // Optimistic update
        setOrders(prev =>
            prev.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            )
        );

        try {
            await sellerApi.patch(`/orders/${orderId}/status`, { status: newStatus });
        } catch (error) {
            console.error('Failed to update status:', error);
            // Revert on failure
            fetchOrders();
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatCurrency = (amount) => {
        if (amount == null) return '$0.00';
        return `$${Number(amount).toFixed(2)}`;
    };

    if (loading) {
        return (
            <div className="p-6 md:p-10 flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
                <p className="text-gray-500 mt-1">View and manage your customer orders.</p>
            </div>

            {orders.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                    <PackageX className="w-14 h-14 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-1">No orders yet</h3>
                    <p className="text-sm text-gray-400">Orders from customers will appear here.</p>
                </div>
            ) : (
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
                                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-blue-600">{order.orderId}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {order.customer?.name || 'Unknown'}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{formatDate(order.createdAt)}</td>
                                        <td className="px-6 py-4 text-gray-900 font-medium">{formatCurrency(order.total)}</td>
                                        <td className="px-6 py-4">
                                            <Select.Root value={order.status} onValueChange={(val) => handleStatusChange(order._id, val)}>
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
            )}
        </div>
    );
};

export default Orders;
