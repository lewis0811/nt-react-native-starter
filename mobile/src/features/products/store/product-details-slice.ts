import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { apiClient } from '../../../services/api/api-client';
import { Product } from '../types';

export interface Review {
    [key: string]: any;
}

interface ProductDetailsState {
    product: Product | null;
    reviews: Review[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductDetailsState = {
    product: null,
    reviews: [],
    loading: false,
    error: null,
};

export const fetchProductById = createAsyncThunk('productDetails/fetchProductById', async (id: number, { rejectWithValue }) => {
    try {
        const resp = await apiClient.get(`/product/${id}`);
        return resp.data?.data;
    } catch (err: unknown) {
        const error = err as AxiosError<{ message?: string }>;
        return rejectWithValue(error.response?.data?.message || error.message || 'Error fetching product details');
    }
});

export const fetchProductReviews = createAsyncThunk('productDetails/fetchProductReviews', async (id: number, { rejectWithValue }) => {
    try {
        const resp = await apiClient.get(`/product/${id}/review`);
        return resp.data?.data ?? [];
    } catch (err: unknown) {
        const error = err as AxiosError<{ message?: string }>;
        return rejectWithValue(error.response?.data?.message || error.message || 'Error fetching product reviews');
    }
});

const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    reducers: {
        setProduct(state, action: PayloadAction<Product | null>) {
            state.product = action.payload;
            state.error = null;
        },
        resetProductDetails() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'Unknown error';
            })
            .addCase(fetchProductReviews.fulfilled, (state, action) => {
                state.reviews = action.payload;
            })
            .addCase(fetchProductReviews.rejected, (state, action) => {
                console.error('Error while fetching product reviews:', action.payload);
            });
    }
});

export const { setProduct, resetProductDetails } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;