import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI } from './authAPI';

// Async thunk for user login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            return await loginAPI(credentials);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to login'
            );
        }
    }
);

// Load initial state from localStorage if available
const tokenFromStorage = localStorage.getItem('token');
const userFromStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

const initialState = {
    user: userFromStorage,
    token: tokenFromStorage,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                // Assuming response has token and user object
                state.token = action.payload.token;
                state.user = action.payload.user;

                // Persist securely in localStorage
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
