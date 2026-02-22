import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
    return (
        <div className="flex bg-black min-h-screen w-full relative font-sans">
            <div className="sticky top-0 h-screen shrink-0 z-20">
                <AdminSidebar />
            </div>
            <main className="flex-1 min-w-0 w-full overflow-x-hidden p-8 lg:p-12">
                <div className="max-w-7xl mx-auto space-y-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
