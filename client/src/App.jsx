import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
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

const App = () => {
  return (
    <Theme accentColor="indigo" panelBackground="translucent">
      <Toaster position="top-right" reverseOrder={false} />
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
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </SellerAuthProvider>
    </Theme>
  );
};

export default App;
