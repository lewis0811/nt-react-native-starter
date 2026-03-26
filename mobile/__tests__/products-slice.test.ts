import { configureStore } from '@reduxjs/toolkit';
import productsReducer, {
    fetchProducts,
    selectProducts,
    selectProductsLoading,
    selectProductsError,
} from '../src/slices/products-slice';
import { apiClient } from '../src/services/api-service';

jest.mock('../src/services/api-service', () => ({
    apiClient: { get: jest.fn() },
}));

const mockGet = apiClient.get as jest.Mock;

const mockProducts = [
    { id: 1, name: 'Product A', description: 'Electronics', price: 100 },
    { id: 2, name: 'Product B', description: 'Clothing', price: 50 },
];

const createTestStore = () =>
    configureStore({ reducer: { products: productsReducer } });

describe('products-slice', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should have correct initial state', () => {
        const store = createTestStore();
        const state = store.getState().products;
        expect(state.list).toEqual([]);
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
    });

    describe('fetchProducts', () => {
        it('should set loading=true while pending', () => {
            mockGet.mockReturnValue(new Promise(() => { }));
            const store = createTestStore();
            // cast thunk to any so TS accepts async-thunk dispatch in tests
            store.dispatch(fetchProducts() as any);
            const state = store.getState().products;
            expect(state.loading).toBe(true);
            expect(state.error).toBeNull();
        });

        it('should populate list on fulfilled with nested data', async () => {
            mockGet.mockResolvedValueOnce({ data: { data: mockProducts } });
            const store = createTestStore();
            await store.dispatch(fetchProducts() as any);
            const state = store.getState().products;
            expect(state.loading).toBe(false);
            expect(state.list).toEqual(mockProducts);
        });

        it('should populate list on fulfilled with direct array', async () => {
            mockGet.mockResolvedValueOnce({ data: mockProducts });
            const store = createTestStore();
            await store.dispatch(fetchProducts() as any);
            expect(store.getState().products.list).toEqual(mockProducts);
        });

        it('should set empty list when payload is not an array', async () => {
            mockGet.mockResolvedValueOnce({ data: { data: null } });
            const store = createTestStore();
            await store.dispatch(fetchProducts() as any);
            expect(store.getState().products.list).toEqual([]);
        });

        it('should set error on rejected with payload', async () => {
            const apiError = {
                response: { status: 500, data: { message: 'Server error' } },
                message: 'Request failed',
            };
            mockGet.mockRejectedValueOnce(apiError);
            const store = createTestStore();
            await store.dispatch(fetchProducts() as any);
            const state = store.getState().products;
            expect(state.loading).toBe(false);
            expect(state.error).toBeTruthy();
            expect((state.error as any).message).toBe('Server error');
        });

        it('should set error using message when no response data', async () => {
            mockGet.mockRejectedValueOnce({ message: 'Network Error' });
            const store = createTestStore();
            await store.dispatch(fetchProducts() as any);
            expect((store.getState().products.error as any).message).toBe('Network Error');
        });
    });

    describe('selectors', () => {
        it('selectProducts should return products list', async () => {
            mockGet.mockResolvedValueOnce({ data: { data: mockProducts } });
            const store = createTestStore();
            await store.dispatch(fetchProducts() as any);
            expect(selectProducts(store.getState() as any)).toEqual(mockProducts);
        });

        it('selectProductsLoading should return loading flag', () => {
            const store = createTestStore();
            expect(selectProductsLoading(store.getState() as any)).toBe(false);
        });

        it('selectProductsError should return null initially', () => {
            const store = createTestStore();
            expect(selectProductsError(store.getState() as any)).toBeNull();
        });
    });
});
