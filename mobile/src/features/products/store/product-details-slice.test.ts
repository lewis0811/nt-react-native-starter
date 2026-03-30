import { configureStore } from '@reduxjs/toolkit';
import productDetailsReducer, {
    fetchProductById,
    fetchProductReviews,
    setProduct,
} from './product-details-slice';
import { apiClient } from '../../../services/api/api-client';

jest.mock('../../../services/api/api-client', () => ({
    apiClient: { get: jest.fn() },
}));

const mockGet = apiClient.get as jest.Mock;

const mockProduct = { id: 5, name: 'Test Product', price: 99 };
const mockReviews = [{ id: 1, comment: 'Great!', rating: 5 }];

const createTestStore = () =>
    configureStore({ reducer: { productDetails: productDetailsReducer } });

describe('product-details-slice', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should have correct initial state', () => {
        const store = createTestStore();
        const state = store.getState().productDetails;
        expect(state.product).toBeNull();
        expect(state.reviews).toEqual([]);
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
    });

    describe('setProduct action', () => {
        it('should set product and clear error', () => {
            const store = createTestStore();
            store.dispatch(setProduct(mockProduct as any));
            const state = store.getState().productDetails;
            expect(state.product).toEqual(mockProduct);
            expect(state.error).toBeNull();
        });

        it('should set product to null when called with null', () => {
            const store = createTestStore();
            store.dispatch(setProduct(mockProduct as any));
            store.dispatch(setProduct(null));
            expect(store.getState().productDetails.product).toBeNull();
        });
    });

    describe('fetchProductById', () => {
        it('should set loading=true on pending', () => {
            mockGet.mockReturnValue(new Promise(() => { }));
            const store = createTestStore();
            store.dispatch(fetchProductById(5));
            expect(store.getState().productDetails.loading).toBe(true);
            expect(store.getState().productDetails.error).toBeNull();
        });

        it('should set product on fulfilled with nested data', async () => {
            mockGet.mockResolvedValueOnce({ data: { data: mockProduct } });
            const store = createTestStore();
            await store.dispatch(fetchProductById(5));
            const state = store.getState().productDetails;
            expect(state.loading).toBe(false);
            expect(state.product).toEqual(mockProduct);
        });

        it('should set error on rejected', async () => {
            mockGet.mockRejectedValueOnce({ message: 'Product not found' });
            const store = createTestStore();
            await store.dispatch(fetchProductById(999));
            const state = store.getState().productDetails;
            expect(state.loading).toBe(false);
            expect(state.error).toBe('Product not found');
        });

        it('should set fallback error message when error has no message', async () => {
            mockGet.mockRejectedValueOnce({});
            const store = createTestStore();
            await store.dispatch(fetchProductById(0));
            expect(store.getState().productDetails.error).toBe('Error fetching product details');
        });
    });

    describe('fetchProductReviews', () => {
        it('should set reviews on fulfilled with nested data', async () => {
            mockGet.mockResolvedValueOnce({ data: { data: mockReviews } });
            const store = createTestStore();
            await store.dispatch(fetchProductReviews(5));
            expect(store.getState().productDetails.reviews).toEqual(mockReviews);
        });

        it('should set empty array when fulfilled with null/undefined data', async () => {
            mockGet.mockResolvedValueOnce({ data: null });
            const store = createTestStore();
            await store.dispatch(fetchProductReviews(5));
            expect(store.getState().productDetails.reviews).toEqual([]);
        });

        it('should not change loading flag on fetchProductReviews.pending', () => {
            mockGet.mockReturnValue(new Promise(() => { }));
            const store = createTestStore();
            const initialLoading = store.getState().productDetails.loading;
            store.dispatch(fetchProductReviews(5));
            expect(store.getState().productDetails.loading).toBe(initialLoading);
        });

        it('should ignore rejected fetchProductReviews', async () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
            const store = createTestStore();
            const prevState = store.getState().productDetails;
            mockGet.mockRejectedValueOnce({ message: 'Reviews not available' });
            await store.dispatch(fetchProductReviews(5));
            const state = store.getState().productDetails;
            expect(state.error).toBe(prevState.error);
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });
});