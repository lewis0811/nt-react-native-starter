import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../services/api-client';

interface ApiState {
    data: any[];
    loading: boolean;
    error: string | null;
}

const initialState: ApiState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchApiData = createAsyncThunk('api/fetchApiData', async (_, { rejectWithValue }) => {
    try {
        const resp = await apiClient.get('/product');
        return resp.data?.data ?? resp.data;
    } catch (err: any) {
        const message = err?.response?.data?.message || err?.message || 'Failed to fetch API data';
        return rejectWithValue(message);
    }
});

export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApiData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = Array.isArray(action.payload) ? action.payload : (action.payload?.data ?? []);
                state.error = null;
            })
            .addCase(fetchApiData.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || action.error.message || 'Unknown error';
            });
    },
});

export const selectApiData = (state: { api: ApiState }) => state.api.data;
export const selectApiLoading = (state: { api: ApiState }) => state.api.loading;
export const selectApiError = (state: { api: ApiState }) => state.api.error;

export default apiSlice.reducer;
