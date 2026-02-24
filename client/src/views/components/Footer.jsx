import React from 'react';
import { Link } from 'react-router-dom';
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Mail,
    Phone,
    MapPin,
    ShoppingBag,
    ArrowRight
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main footer content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand & About */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="bg-indigo-600 p-2 rounded-lg">
                                <ShoppingBag className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">Shopzy</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Your one-stop destination for premium products. We offer the best quality items with fast shipping and excellent customer service.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors bg-gray-800 p-2 rounded-full hover:bg-indigo-600">
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors bg-gray-800 p-2 rounded-full hover:bg-indigo-600">
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors bg-gray-800 p-2 rounded-full hover:bg-indigo-600">
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors bg-gray-800 p-2 rounded-full hover:bg-indigo-600">
                                <Youtube className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2 text-sm group">
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2 text-sm group">
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link to="/deals" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2 text-sm group">
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    Hot Deals
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2 text-sm group">
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    Shopping Cart
                                </Link>
                            </li>
                            <li>
                                <Link to="/track-order" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2 text-sm group">
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    Track Order
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-6">Customer Service</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/help" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2 text-sm group">
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2 text-sm group">
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    Returns & Refunds
                                </Link>
                            </li>
                            <li>
                                <Link to="/shipping" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2 text-sm group">
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    Shipping Information
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2 text-sm group">
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2 text-sm group">
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <MapPin className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">
                                    123 Commerce St, Tech District<br />
                                    San Francisco, CA 94105
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                                <a href="mailto:support@shopzy.com" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                                    support@shopzy.com
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm text-center md:text-left">
                        &copy; {currentYear} Shopzy. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {/* Payment method placeholders - simplified for tech purposes */}
                        <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400 font-bold">VISA</div>
                        <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400 font-bold">MC</div>
                        <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400 font-bold">AMEX</div>
                        <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400 font-bold">PAYPAL</div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
