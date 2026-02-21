import React from 'react';
import { Loader2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useSettingsController from '../../../controllers/useSettingsController';
import StoreInfoTab from '../../components/seller/StoreInfoTab';
import SecurityTab from '../../components/seller/SecurityTab';

const Settings = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const ctrl = useSettingsController();

    const pathParts = location.pathname.split('/');
    const activeTab = pathParts[3] || 'store';

    useEffect(() => {
        if (location.pathname === '/seller/settings' || location.pathname === '/seller/settings/') {
            navigate('/seller/settings/store', { replace: true });
        }
    }, [location.pathname, navigate]);

    if (ctrl.loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'store':
                return (
                    <StoreInfoTab
                        storeForm={ctrl.storeForm}
                        setStoreForm={ctrl.setStoreForm}
                        handleChange={ctrl.handleChange}
                        handleSaveStore={ctrl.handleSaveStore}
                        saving={ctrl.saving}
                    />
                );
            case 'bank':
                return (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Bank Details</h2>
                            <p className="text-sm text-gray-500 mt-1">Manage where your payouts are sent.</p>
                        </div>
                        <div className="grid gap-6 max-w-2xl">
                            <div className="p-6 border border-dashed border-gray-300 rounded-lg text-center">
                                <p className="text-sm text-gray-500">No bank accounts linked yet.</p>
                                <button className="mt-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
                                    + Add Bank Account
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'shipping':
                return (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Shipping Configurations</h2>
                            <p className="text-sm text-gray-500 mt-1">Set up your shipping zones and rates.</p>
                        </div>
                        <div className="grid gap-6 max-w-2xl">
                            <div className="p-6 border border-dashed border-gray-300 rounded-lg text-center">
                                <p className="text-sm text-gray-500">No shipping configurations set up yet.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'tax':
                return (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Tax Information</h2>
                            <p className="text-sm text-gray-500 mt-1">Manage your tax IDs and collection settings.</p>
                        </div>
                        <div className="grid gap-6 max-w-2xl">
                            <div className="p-6 border border-dashed border-gray-300 rounded-lg text-center">
                                <p className="text-sm text-gray-500">No tax information configured yet.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <SecurityTab
                        seller={ctrl.seller}
                        passwordForm={ctrl.passwordForm}
                        setPasswordForm={ctrl.setPasswordForm}
                        changingPassword={ctrl.changingPassword}
                        showCurrentPw={ctrl.showCurrentPw}
                        setShowCurrentPw={ctrl.setShowCurrentPw}
                        showNewPw={ctrl.showNewPw}
                        setShowNewPw={ctrl.setShowNewPw}
                        deleteDialogOpen={ctrl.deleteDialogOpen}
                        setDeleteDialogOpen={ctrl.setDeleteDialogOpen}
                        deletePassword={ctrl.deletePassword}
                        setDeletePassword={ctrl.setDeletePassword}
                        deleting={ctrl.deleting}
                        handleChangePassword={ctrl.handleChangePassword}
                        handleDeleteAccount={ctrl.handleDeleteAccount}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6 md:p-10 animate-in fade-in duration-500">
            {renderContent()}
        </div>
    );
};

export default Settings;
