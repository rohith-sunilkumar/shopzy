import React from 'react';
import DesktopNavbar from './navigation/DesktopNavbar';
import CategoryMenu from './navigation/CategoryMenu';
import MobileNavbar from './navigation/MobileNavbar';

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full flex flex-col bg-white">
            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-col w-full">
                <DesktopNavbar />
                <CategoryMenu />
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                <MobileNavbar />
            </div>
        </header>
    );
};

export default Navbar;
