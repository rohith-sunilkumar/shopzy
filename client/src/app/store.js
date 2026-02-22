import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import productReducer from '../features/products/productSlice';
import orderReducer from '../features/orders/orderSlice';

// Combine all slice reducers into the main store
export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        product: productReducer,
        order: orderReducer,
    },
    // Redux Toolkit includes redux-thunk implicitly
    // and turns on Redux DevTools by default in development. 
    // You can customize middleware here if strictly needed.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: import.meta.env.NODE_ENV !== 'production',
});
