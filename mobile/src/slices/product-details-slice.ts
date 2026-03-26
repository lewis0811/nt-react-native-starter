import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../services/api-client';
import { Product } from '../types/product';

interface ProductDetailsState {
    product: Product | null;
    reviews: any[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductDetailsState = {
    product: null,
    reviews: [],
    loading: false,
    error: null,
};

export const fetchProductById = createAsyncThunk('productDetails/fetchProductById', async (id: number) => {
    const resp = await apiClient.get(`/product/${id}`);
    return resp.data?.data ?? resp.data;
});

export const fetchProductReviews = createAsyncThunk('productDetails/fetchProductReviews', async (id: number) => {
    const resp = await apiClient.get(`/product/${id}/review`);
    return resp.data?.data ?? resp.data ?? [];
});

const slice = createSlice({
    name: 'productDetails',
    initialState,
    reducers: {
        setProduct(state, action: PayloadAction<Product | null>) {
            state.product = action.payload;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductById.pending, (state) => { state.loading = true; state.error = null; });
        builder.addCase(fetchProductById.fulfilled, (state, action) => { state.loading = false; state.product = action.payload; });
        builder.addCase(fetchProductById.rejected, (state, action) => { state.loading = false; state.error = String(action.error.message || 'Failed'); });

        builder.addCase(fetchProductReviews.pending, (state) => { /* keep loading flag as-is */ });
        builder.addCase(fetchProductReviews.fulfilled, (state, action) => { state.reviews = action.payload; });
        builder.addCase(fetchProductReviews.rejected, (state) => { /* ignore */ });
    }
});

export const { setProduct } = slice.actions;
export default slice.reducer;
