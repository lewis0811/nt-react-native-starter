import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../services/api-service';

interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

interface ApiState {
    data: Photo[];
    loading: boolean;
    error: string | null;
}

const initialState: ApiState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchApiData = createAsyncThunk('api/fetchData', async () => {
    const response = await apiService.fetchData();
    return response.data as Photo[];
});

export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchApiData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchApiData.fulfilled, (state, action: PayloadAction<Photo[]>) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchApiData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || 'Unknown error';
        });
    },
});

export const selectApiData = (state: { api: ApiState }) => state.api.data;
export const selectApiLoading = (state: { api: ApiState }) => state.api.loading;
export const selectApiError = (state: { api: ApiState }) => state.api.error;

export default apiSlice.reducer;
