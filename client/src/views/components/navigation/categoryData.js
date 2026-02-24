import {
    Sparkles,
    Flame,
    Tag,
    Zap,
    Smartphone,
    Laptop,
    Headphones,
    Watch,
    Shirt,
    Briefcase,
    Gem,
    Footprints,
    Coffee,
    Sofa,
    Smile,
    Dumbbell,
    Tent,
    BookOpen,
    Library,
    Gamepad2,
    Puzzle,
    Car,
    Wrench,
    Activity,
    Heart,
    Apple,
    ShoppingCart,
} from "lucide-react";

export const dropdownData = [
    {
        label: "Hot Deals",
        highlight: true,
        items: [
            {
                title: "Flash Sales",
                desc: "Limited time offers ending soon",
                icon: Zap,
                to: "/deals",
            },
            {
                title: "Clearance",
                desc: "Up to 70% off selected items",
                icon: Tag,
                to: "/clearance",
            },
        ],
    },
    {
        label: "Electronics",
        items: [
            {
                title: "Smartphones",
                desc: "Latest phones & accessories",
                icon: Smartphone,
                to: "/category/electronics/smartphones",
            },
            {
                title: "Laptops & PCs",
                desc: "For work and gaming",
                icon: Laptop,
                to: "/category/electronics/laptops",
            },
            {
                title: "Audio",
                desc: "Headphones & speakers",
                icon: Headphones,
                to: "/category/electronics/audio",
            },
            {
                title: "Wearables",
                desc: "Smartwatches & trackers",
                icon: Watch,
                to: "/category/electronics/wearables",
            },
        ],
    },
    {
        label: "Fashion",
        items: [
            {
                title: "Men's Clothing",
                desc: "Shirts, trousers & more",
                icon: Shirt,
                to: "/category/fashion/men",
            },
            {
                title: "Women's Clothing",
                desc: "Dresses, tops & ethnic",
                icon: Briefcase,
                to: "/category/fashion/women",
            },
            {
                title: "Footwear",
                desc: "Sneakers, boots & heels",
                icon: Footprints,
                to: "/category/fashion/shoes",
            },
            {
                title: "Accessories",
                desc: "Bags, belts & jewelry",
                icon: Gem,
                to: "/category/fashion/accessories",
            },
        ],
    },
    {
        label: "Home & Kitchen",
        items: [
            {
                title: "Kitchen Appliances",
                desc: "Mixers, ovens & makers",
                icon: Coffee,
                to: "/category/home/appliances",
            },
            {
                title: "Home Decor",
                desc: "Furnishings & lighting",
                icon: Sofa,
                to: "/category/home/decor",
            },
        ],
    },
    {
        label: "Beauty",
        items: [
            {
                title: "Skincare",
                desc: "Creams & serums",
                icon: Sparkles,
                to: "/category/beauty/skincare",
            },
            {
                title: "Makeup",
                desc: "Cosmetics & tools",
                icon: Smile,
                to: "/category/beauty/makeup",
            },
        ],
    },
    {
        label: "Sports & Outdoors",
        items: [
            {
                title: "Fitness & Exercise",
                desc: "Weights, cardio & yoga",
                icon: Dumbbell,
                to: "/category/sports/fitness",
            },
            {
                title: "Outdoor Recreation",
                desc: "Camping, hiking & cycling",
                icon: Tent,
                to: "/category/sports/outdoor",
            },
        ],
    },
    {
        label: "Books",
        items: [
            {
                title: "Fiction & Novels",
                desc: "Bestsellers & classics",
                icon: BookOpen,
                to: "/category/books/fiction",
            },
            {
                title: "Educational",
                desc: "Textbooks & reference manuals",
                icon: Library,
                to: "/category/books/educational",
            },
        ],
    },
    {
        label: "Toys",
        items: [
            {
                title: "Gaming & Consoles",
                desc: "Latest gaming gear",
                icon: Gamepad2,
                to: "/category/toys/gaming",
            },
            {
                title: "Kids & Baby Toys",
                desc: "Educational & fun toys",
                icon: Puzzle,
                to: "/category/toys/kids",
            },
        ],
    },
    {
        label: "Automotive",
        items: [
            {
                title: "Car Accessories",
                desc: "Interior & exterior parts",
                icon: Car,
                to: "/category/automotive/accessories",
            },
            {
                title: "Tools & Equipment",
                desc: "Maintenance & repairs",
                icon: Wrench,
                to: "/category/automotive/tools",
            },
        ],
    },
    {
        label: "Health & Wellness",
        items: [
            {
                title: "Vitamins & Supplements",
                desc: "Daily health boosters",
                icon: Activity,
                to: "/category/health/supplements",
            },
            {
                title: "Personal Care",
                desc: "Hygiene & grooming products",
                icon: Heart,
                to: "/category/health/personal-care",
            },
        ],
    },
    {
        label: "Groceries",
        items: [
            {
                title: "Fresh Produce",
                desc: "Fruits & vegetables",
                icon: Apple,
                to: "/category/groceries/produce",
            },
            {
                title: "Pantry Staples",
                desc: "Daily cooking essentials",
                icon: ShoppingCart,
                to: "/category/groceries/pantry",
            },
        ],
    },
];

export const simpleLinks = [];
