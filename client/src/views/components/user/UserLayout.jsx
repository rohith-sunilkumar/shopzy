import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import AuthDialog from "../auth/AuthDialog";
import SellerAuthDialog from "../auth/SellerAuthDialog";
import Footer from "../Footer";

const UserLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
            <Navbar />
            <AuthDialog />
            <SellerAuthDialog />
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default UserLayout;
