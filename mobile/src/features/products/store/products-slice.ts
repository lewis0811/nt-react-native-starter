import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '../../../services/api/api-service';
import type { RootState } from '../../../store/root-reducer';
import type { Product } from '../types/product';

type FetchProductsError = { message: string; status?: number };

export const fetchProducts = createAsyncThunk<
    Product[],
    void,
    { state: RootState; rejectValue: FetchProductsError }
>(
    'products/fetch',
    async (_, { getState, rejectWithValue }) => {
        try {
            const resp = await apiClient.get('/product');
            const data = resp.data && resp.data.data ? resp.data.data : resp.data;
            return data;
        } catch (e: any) {
            const status = e?.response?.status;
            const msg =
                (e && e.response && (e.response.data?.message ?? e.response.data)) || e.message || String(e);
            return rejectWithValue({ message: String(msg), status });
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: { list: [] as Product[], loading: false, error: null as FetchProductsError | null },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.list = Array.isArray(action.payload) ? action.payload : [];
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            if (action.payload) {
                state.error = action.payload as FetchProductsError;
            } else {
                state.error = { message: action.error?.message || 'Unknown error' };
            }
        });
    },
});

export default productsSlice.reducer;
export const selectProducts = (s: RootState) => s.products.list;
export const selectProductsLoading = (s: RootState) => s.products.loading;
export const selectProductsError = (s: RootState) => s.products.error as FetchProductsError | null;
