import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSellerAuth } from "../models/SellerAuthContext";

export const useSellerSidebar = () => {
    const { sellerLogout, seller } = useSellerAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const isSettingsActive = location.pathname.startsWith("/seller/settings");

    // Auto-expand settings dropdown when on a settings page
    useEffect(() => {
        if (isSettingsActive) {
            setSettingsOpen(true);
        }
    }, [isSettingsActive]);

    // Auto collapse on tablet/smaller screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = async () => {
        await sellerLogout();
        navigate('/');
    };

    const handleSettingsClick = () => {
        if (isCollapsed) {
            // When collapsed, navigate directly to store settings
            navigate('/seller/settings/store');
            return;
        }
        setSettingsOpen(!settingsOpen);
        // If opening and not already on a settings page, navigate to the first one
        if (!settingsOpen && !isSettingsActive) {
            navigate('/seller/settings/store');
        }
    };

    return {
        seller,
        isCollapsed,
        setIsCollapsed,
        settingsOpen,
        isSettingsActive,
        handleLogout,
        handleSettingsClick
    };
};
