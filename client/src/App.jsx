import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./views/pages/Dashboard";
import Cart from "./views/pages/Cart";
import { AuthProvider } from "./models/AuthContext";
import { SellerAuthProvider } from "./models/SellerAuthContext";
import ProtectedRoute from "./views/components/ProtectedRoute";
import SellerProtectedRoute from "./views/components/seller/SellerProtectedRoute";
import UserLayout from "./views/components/user/UserLayout";
import SellerLayout from "./views/components/seller/SellerLayout";
import Overview from "./views/pages/seller/Overview";
import Products from "./views/pages/seller/Products";
import Orders from "./views/pages/seller/Orders";
import Earnings from "./views/pages/seller/Earnings";
import Promotions from "./views/pages/seller/Promotions";
import Messages from "./views/pages/seller/Messages";
import Reviews from "./views/pages/seller/Reviews";
import Settings from "./views/pages/seller/Settings";
import { Toaster } from "react-hot-toast";

import { AdminAuthProvider } from "./models/AdminAuthContext";
import AdminProtectedRoute from "./views/components/admin/AdminProtectedRoute";
import AdminLayout from "./views/components/admin/AdminLayout";
import AdminDashboard from "./views/pages/admin/Dashboard";
import AdminUsers from "./views/pages/admin/Users";
import AdminSellers from "./views/pages/admin/Sellers";
import AdminLogin from "./views/pages/admin/AdminLogin";

const AppContent = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AdminAuthProvider>
        <SellerAuthProvider>
          <AuthProvider>
            <BrowserRouter>
              <div className="min-h-screen">
                <Routes>
                  {/* User Routes */}
                  <Route path="/" element={<UserLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                  </Route>

                  {/* Seller Routes */}
                  <Route path="/seller" element={<SellerProtectedRoute><SellerLayout /></SellerProtectedRoute>}>
                    <Route index element={<Overview />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="earnings" element={<Earnings />} />
                    <Route path="promotions" element={<Promotions />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="reviews" element={<Reviews />} />
                    <Route path="settings/*" element={<Settings />} />
                  </Route>

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="sellers" element={<AdminSellers />} />
                  </Route>

                </Routes>
              </div>
            </BrowserRouter>
          </AuthProvider>
        </SellerAuthProvider>
      </AdminAuthProvider>
    </>
  );
};

const App = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <Theme accentColor="indigo" panelBackground="translucent">
      {googleClientId ? (
        <GoogleOAuthProvider clientId={googleClientId}>
          <AppContent />
        </GoogleOAuthProvider>
      ) : (
        <AppContent />
      )}
    </Theme>
  );
};

export default App;
