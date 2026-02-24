import React from 'react';
import ChangePasswordSection from './security/ChangePasswordSection';
import AccountInfoSection from './security/AccountInfoSection';
import DangerZoneSection from './security/DangerZoneSection';

const SecurityTab = ({
    seller,
    passwordForm,
    setPasswordForm,
    changingPassword,
    showCurrentPw,
    setShowCurrentPw,
    showNewPw,
    setShowNewPw,
    deleteDialogOpen,
    setDeleteDialogOpen,
    deletePassword,
    setDeletePassword,
    deleting,
    handleChangePassword,
    handleDeleteAccount,
}) => {
    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            <div>
                <h2 className="text-lg font-bold text-gray-900">Security & Password</h2>
                <p className="text-sm text-gray-500 mt-1">Keep your seller account secure.</p>
            </div>

            <div className="max-w-2xl space-y-8">
                <ChangePasswordSection
                    passwordForm={passwordForm}
                    setPasswordForm={setPasswordForm}
                    changingPassword={changingPassword}
                    showCurrentPw={showCurrentPw}
                    setShowCurrentPw={setShowCurrentPw}
                    showNewPw={showNewPw}
                    setShowNewPw={setShowNewPw}
                    handleChangePassword={handleChangePassword}
                />

                <AccountInfoSection seller={seller} />

                <DangerZoneSection
                    deleteDialogOpen={deleteDialogOpen}
                    setDeleteDialogOpen={setDeleteDialogOpen}
                    deletePassword={deletePassword}
                    setDeletePassword={setDeletePassword}
                    deleting={deleting}
                    handleDeleteAccount={handleDeleteAccount}
                />
            </div>
        </div>
    );
};

export default SecurityTab;
