import React from 'react';
import { Percent, Zap, Ticket, Loader2 } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import usePromotionsController from '../../../controllers/usePromotionsController';
import CreatePromotionDialog from '../../components/seller/CreatePromotionDialog';
import PromotionCard from '../../components/seller/PromotionCard';

const Promotions = () => {
    const ctrl = usePromotionsController();

    if (ctrl.loading) {
        return (
            <div className="p-6 md:p-10 flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Promotions & Discounts</h1>
                    <p className="text-gray-500 mt-1">Manage sales, create coupons, and join flash sales.</p>
                </div>
                <CreatePromotionDialog
                    dialogOpen={ctrl.dialogOpen}
                    setDialogOpen={ctrl.setDialogOpen}
                    form={ctrl.form}
                    setForm={ctrl.setForm}
                    creating={ctrl.creating}
                    handleCreate={ctrl.handleCreate}
                />
            </div>

            <Tabs.Root defaultValue="discounts" className="flex flex-col w-full">
                <Tabs.List className="flex shrink-0 border-b border-gray-200 gap-6 overflow-x-auto">
                    <Tabs.Trigger value="discounts" className="flex items-center gap-2 pb-3 pt-2 text-sm font-medium text-gray-500 hover:text-gray-900 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 outline-none transition-colors whitespace-nowrap">
                        <Percent className="w-4 h-4" />
                        Active Discounts ({ctrl.discounts.length})
                    </Tabs.Trigger>
                    <Tabs.Trigger value="coupons" className="flex items-center gap-2 pb-3 pt-2 text-sm font-medium text-gray-500 hover:text-gray-900 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 outline-none transition-colors whitespace-nowrap">
                        <Ticket className="w-4 h-4" />
                        Coupons ({ctrl.coupons.length})
                    </Tabs.Trigger>
                    <Tabs.Trigger value="flash-sales" className="flex items-center gap-2 pb-3 pt-2 text-sm font-medium text-gray-500 hover:text-gray-900 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 outline-none transition-colors whitespace-nowrap">
                        <Zap className="w-4 h-4" />
                        Flash Sales
                    </Tabs.Trigger>
                </Tabs.List>

                {/* Discounts Tab */}
                <Tabs.Content value="discounts" className="py-6 outline-none">
                    {ctrl.discounts.length === 0 ? (
                        <div className="p-8 text-center bg-gray-50 border border-gray-200 border-dashed rounded-xl">
                            <Percent className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-900">No Discounts Yet</h3>
                            <p className="text-gray-500 text-sm mt-1">Create your first discount to attract more customers.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {ctrl.discounts.map((promo) => (
                                <PromotionCard
                                    key={promo._id}
                                    promo={promo}
                                    type="discount"
                                    getDaysRemaining={ctrl.getDaysRemaining}
                                    onToggle={ctrl.handleToggleStatus}
                                    onDelete={ctrl.handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </Tabs.Content>

                {/* Coupons Tab */}
                <Tabs.Content value="coupons" className="py-6 outline-none">
                    {ctrl.coupons.length === 0 ? (
                        <div className="p-8 text-center bg-gray-50 border border-gray-200 border-dashed rounded-xl">
                            <Ticket className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-900">No Coupons Yet</h3>
                            <p className="text-gray-500 text-sm mt-1">Create coupon codes your customers can use at checkout.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {ctrl.coupons.map((promo) => (
                                <PromotionCard
                                    key={promo._id}
                                    promo={promo}
                                    type="coupon"
                                    getDaysRemaining={ctrl.getDaysRemaining}
                                    onToggle={ctrl.handleToggleStatus}
                                    onDelete={ctrl.handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </Tabs.Content>

                {/* Flash Sales Tab */}
                <Tabs.Content value="flash-sales" className="py-6 outline-none">
                    <div className="p-8 text-center bg-gray-50 border border-gray-200 border-dashed rounded-xl">
                        <Zap className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">No Active Flash Sales</h3>
                        <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">You haven't joined any platform flash sales yet. Check back later for upcoming events to boost your sales.</p>
                        <button className="mt-4 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm shadow-sm">
                            Browse Upcoming Events
                        </button>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    );
};

export default Promotions;
