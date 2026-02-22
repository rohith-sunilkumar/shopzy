import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrderAPI, fetchOrderHistoryAPI } from './orderAPI';

// Create a new order (Protected Route, relies on Axios Interceptor for token)
export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            return await createOrderAPI(orderData);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create order'
            );
        }
    }
);

// Fetch order history (Protected Route)
export const fetchOrderHistory = createAsyncThunk(
    'order/fetchOrderHistory',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchOrderHistoryAPI();
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch order history'
            );
        }
    }
);

const initialState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
    success: false, // Flag to indicate successful creation
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrderState: (state) => {
            state.error = null;
            state.success = false;
            state.currentOrder = null;
        }
    },
    extraReducers: (builder) => {
        // Create Order Cases
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.currentOrder = action.payload;
                // Optionally push to history if viewing list and creating at same time
                state.orders.unshift(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Fetch Order History Cases
        builder
            .addCase(fetchOrderHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrderHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
