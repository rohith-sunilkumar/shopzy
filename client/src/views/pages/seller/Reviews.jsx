import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

const reviews = [
    { id: 1, customer: 'Alex Johnson', product: 'Wireless Headphones', rating: 5, date: 'Oct 24, 2026', text: 'Great sound quality and battery life! Highly recommend.', reply: 'Thanks for the great feedback, Alex! We are glad you love them.' },
    { id: 2, customer: 'Sarah Smith', product: 'Cotton T-Shirt', rating: 4, date: 'Oct 22, 2026', text: 'Very comfortable but the sizing runs a bit small.', reply: null },
    { id: 3, customer: 'Michael Brown', product: 'Smart Watch', rating: 2, date: 'Oct 15, 2026', text: 'The screen scratched easily after a week of use.', reply: null },
];

const RatingStars = ({ rating }) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
            <Star key={star} className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-100 text-gray-200'}`} />
        ))}
    </div>
);

const Reviews = () => {
    return (
        <div className="p-6 md:p-10 space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
                <p className="text-gray-500 mt-1">Manage feedback and respond to your customers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Average Rating</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">4.6</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-xl">
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {reviews.map(review => (
                    <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                            <div>
                                <RatingStars rating={review.rating} />
                                <h3 className="font-semibold text-gray-900 mt-2">{review.product}</h3>
                                <p className="text-sm text-gray-500 mt-1">Reviewed by <span className="font-medium text-gray-700">{review.customer}</span> on {review.date}</p>
                            </div>
                            <div className="shrink-0 flex gap-2">
                                {!review.reply && (
                                    <Dialog.Root>
                                        <Dialog.Trigger asChild>
                                            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors rounded-lg text-sm font-medium">
                                                <MessageSquare className="w-4 h-4" />
                                                Reply
                                            </button>
                                        </Dialog.Trigger>
                                        <Dialog.Portal>
                                            <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in z-50" />
                                            <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-200 bg-white p-6 shadow-xl sm:rounded-xl">
                                                <Dialog.Title className="text-xl font-semibold text-gray-900">Respond to {review.customer}</Dialog.Title>
                                                <Dialog.Description className="text-sm text-gray-500 mt-2 p-3 bg-gray-50 rounded-lg italic border border-gray-100">
                                                    "{review.text}"
                                                </Dialog.Description>
                                                <div className="py-4">
                                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Your Reply</label>
                                                    <textarea rows="4" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-sm" placeholder="Thank you for your feedback..."></textarea>
                                                </div>
                                                <div className="flex justify-end gap-2">
                                                    <Dialog.Close asChild>
                                                        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-sm">Cancel</button>
                                                    </Dialog.Close>
                                                    <Dialog.Close asChild>
                                                        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-sm">Submit Reply</button>
                                                    </Dialog.Close>
                                                </div>
                                            </Dialog.Content>
                                        </Dialog.Portal>
                                    </Dialog.Root>
                                )}
                            </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>

                        {review.reply && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100 flex gap-3">
                                <div className="p-2 bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                                    <span className="text-blue-700 text-xs font-bold">You</span>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium mb-1">Your response</p>
                                    <p className="text-sm text-gray-700">{review.reply}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
