import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    IndianRupee,
    Tag,
    MessageSquare,
    Star,
    Store,
    CreditCard,
    Truck,
    Receipt,
    Shield
} from "lucide-react";

export const links = [
    { name: "Overview", icon: LayoutDashboard, path: "/seller/overview" },
    { name: "Products", icon: Package, path: "/seller/products" },
    { name: "Orders", icon: ShoppingCart, path: "/seller/orders" },
    { name: "Earnings", icon: IndianRupee, path: "/seller/earnings" },
    { name: "Promotions", icon: Tag, path: "/seller/promotions" },
    { name: "Messages", icon: MessageSquare, path: "/seller/messages" },
    { name: "Reviews", icon: Star, path: "/seller/reviews" },
];

export const settingsSubLinks = [
    { name: "Store Info", icon: Store, path: "/seller/settings/store" },
    { name: "Bank Details", icon: CreditCard, path: "/seller/settings/bank" },
    { name: "Shipping", icon: Truck, path: "/seller/settings/shipping" },
    { name: "Tax Info", icon: Receipt, path: "/seller/settings/tax" },
    { name: "Security", icon: Shield, path: "/seller/settings/security" },
];
