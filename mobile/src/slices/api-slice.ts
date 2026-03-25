import { createSlice } from '@reduxjs/toolkit';

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

// External API was deprecated and removed; keep a minimal placeholder slice for compatibility.
export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {},
});

export const selectApiData = (state: { api: ApiState }) => state.api.data;
export const selectApiLoading = (state: { api: ApiState }) => state.api.loading;
export const selectApiError = (state: { api: ApiState }) => state.api.error;

export default apiSlice.reducer;
