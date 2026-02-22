import { createSlice } from '@reduxjs/toolkit';

// Helper function to safely load cart from localStorage
const loadCartFromStorage = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return { cartItems: [], totalAmount: 0, totalQuantity: 0 };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return { cartItems: [], totalAmount: 0, totalQuantity: 0 };
    }
};

// Calculate total utility
const calculateTotals = (items) => {
    const totalAmount = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const totalQuantity = items.reduce(
        (acc, item) => acc + item.quantity,
        0
    );
    return { totalAmount, totalQuantity };
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );

            if (!existingItem) {
                // If it doesn't exist, add it
                state.cartItems.push({
                    ...newItem,
                    quantity: newItem.quantity || 1,
                });
            } else {
                // If it exists, increase quantity
                existingItem.quantity += (newItem.quantity || 1);
            }

            // Recalculate totals
            const totals = calculateTotals(state.cartItems);
            state.totalAmount = totals.totalAmount;
            state.totalQuantity = totals.totalQuantity;

            // Persist securely in localStorage
            localStorage.setItem('cart', JSON.stringify({
                cartItems: state.cartItems,
                totalAmount: state.totalAmount,
                totalQuantity: state.totalQuantity,
            }));
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== id);

            // Recalculate totals
            const totals = calculateTotals(state.cartItems);
            state.totalAmount = totals.totalAmount;
            state.totalQuantity = totals.totalQuantity;

            // Persist securely in localStorage
            localStorage.setItem('cart', JSON.stringify({
                cartItems: state.cartItems,
                totalAmount: state.totalAmount,
                totalQuantity: state.totalQuantity,
            }));
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (existingItem) {
                // Update quantity if valid, min 1
                const newQuantity = Math.max(1, quantity);
                existingItem.quantity = newQuantity;
            }

            // Recalculate totals
            const totals = calculateTotals(state.cartItems);
            state.totalAmount = totals.totalAmount;
            state.totalQuantity = totals.totalQuantity;

            // Persist securely in localStorage
            localStorage.setItem('cart', JSON.stringify({
                cartItems: state.cartItems,
                totalAmount: state.totalAmount,
                totalQuantity: state.totalQuantity,
            }));
        },

        clearCart: (state) => {
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
            localStorage.removeItem('cart');
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
