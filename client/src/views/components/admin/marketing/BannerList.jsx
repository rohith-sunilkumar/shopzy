import React from 'react';
import { Image as ImageIcon, Link as LinkIcon, Trash2 } from 'lucide-react';

const BannerList = ({ banners, toggleStatus, handleDeleteClick }) => {
    return (
        <div className="xl:col-span-2">
            {banners.length === 0 ? (
                <div className="bg-slate-900 rounded-3xl border border-slate-800 p-16 text-center h-full flex flex-col items-center justify-center shadow-sm">
                    <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-inner text-indigo-500">
                        <ImageIcon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3 tracking-tight">No Banners Found</h3>
                    <p className="text-slate-400 max-w-md mx-auto text-lg font-medium leading-relaxed">
                        You haven't uploaded any custom banners yet. The homepage will display default placeholders.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {banners.map(banner => (
                        <div key={banner._id} className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-700 transition-all group flex flex-col pt-1 pl-1 pr-1">
                            {/* Image Header */}
                            <div className="relative aspect-[21/9] bg-slate-800 overflow-hidden rounded-[20px] m-1">
                                <img src={banner.image} alt={banner.title || 'Banner'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />

                                {/* Status Badge */}
                                <div className="absolute top-3 left-3">
                                    {banner.isActive ? (
                                        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/90 text-white text-xs font-black tracking-wide backdrop-blur-md shadow-lg border border-white/20 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_white]" /> ACTIVE
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-slate-300 text-xs font-black tracking-wide backdrop-blur-md shadow-lg border border-slate-700/50 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-slate-500" /> INACTIVE
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h4 className="text-xl font-black text-white mb-3 line-clamp-1 truncate" title={banner.title}>{banner.title || 'Untitled Banner'}</h4>

                                <div className="flex items-center gap-3 text-slate-400 text-sm mb-6 bg-slate-800/50 p-3 rounded-xl border border-slate-800/50">
                                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-500">
                                        <LinkIcon className="w-4 h-4" />
                                    </div>
                                    <span className="truncate font-medium">{banner.linkUrl || 'No redirection link set'}</span>
                                </div>

                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Uploaded On</span>
                                        <span className="text-sm font-bold text-slate-300">
                                            {new Date(banner.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => toggleStatus(banner._id, banner.isActive)}
                                            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${banner.isActive ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700' : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 hover:border-emerald-500'}`}
                                        >
                                            {banner.isActive ? 'Deactivate' : 'Activate'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(banner._id)}
                                            className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-500/25 transition-all group/btn border border-transparent hover:border-rose-400"
                                            title="Delete Banner"
                                        >
                                            <Trash2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BannerList;
