import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsAPI } from './productAPI';

// Fetch products from the backend API
export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchProductsAPI();
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch products'
            );
        }
    }
);

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearProductError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload; // Assuming standard JSON response
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
