import React from 'react';
import { AlertTriangle, Package, MessageCircle, Star } from 'lucide-react';

const OverviewAlerts = ({ alerts }) => {
    const hasAlerts = alerts.lowStockProducts > 0 || alerts.pendingShipments > 0 || alerts.unreadMessages > 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alerts.lowStockProducts > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 transition-colors hover:bg-amber-100">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-amber-800">{alerts.lowStockProducts} Product{alerts.lowStockProducts > 1 ? 's' : ''} Low in Stock</h4>
                        <p className="text-xs text-amber-700 mt-1">Check inventory to avoid missed sales.</p>
                    </div>
                    <button className="ml-auto text-xs font-bold text-amber-700 hover:text-amber-900 border border-amber-300 px-3 py-1.5 rounded-lg bg-white shadow-sm hover:shadow transition-all">View</button>
                </div>
            )}

            {alerts.pendingShipments > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 transition-colors hover:bg-blue-100">
                    <Package className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-blue-800">{alerts.pendingShipments} Pending Shipment{alerts.pendingShipments > 1 ? 's' : ''}</h4>
                        <p className="text-xs text-blue-700 mt-1">Orders waiting to be fulfilled.</p>
                    </div>
                    <button className="ml-auto text-xs font-bold text-blue-700 hover:text-blue-900 border border-blue-300 px-3 py-1.5 rounded-lg bg-white shadow-sm hover:shadow transition-all">Ship</button>
                </div>
            )}

            {alerts.unreadMessages > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 transition-colors hover:bg-emerald-100">
                    <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-emerald-800">{alerts.unreadMessages} Unread Message{alerts.unreadMessages > 1 ? 's' : ''}</h4>
                        <p className="text-xs text-emerald-700 mt-1">Respond to customer inquiries.</p>
                    </div>
                    <button className="ml-auto text-xs font-bold text-emerald-700 hover:text-emerald-900 border border-emerald-300 px-3 py-1.5 rounded-lg bg-white shadow-sm hover:shadow transition-all">Reply</button>
                </div>
            )}

            {!hasAlerts && (
                <div className="md:col-span-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
                    <Star className="w-5 h-5 text-emerald-600 shrink-0 fill-emerald-600" />
                    <p className="text-sm font-medium text-emerald-800">All clear! No pending actions right now.</p>
                </div>
            )}
        </div>
    );
};

export default OverviewAlerts;
