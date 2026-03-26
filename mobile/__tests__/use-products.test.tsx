import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../src/slices/products-slice';
import useProducts from '../src/hooks/use-products';
import { apiClient } from '../src/services/api-service';

jest.mock('../src/services/api-service', () => ({
    apiClient: { get: jest.fn() },
}));

const mockGet = apiClient.get as jest.Mock;

const makeWrapper = (store: any) =>
    ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
    );

const createTestStore = () =>
    configureStore({ reducer: { products: productsReducer } });

const sampleProducts = [
    { id: 1, name: 'iPhone', description: 'Electronics', price: 999 },
    { id: 2, name: 'T-Shirt', description: 'Clothing', price: 29 },
    { id: 3, name: 'Laptop', description: 'Electronics', price: 1299 },
    { id: 4, name: 'Jeans', description: '', price: 49 },
];

describe('useProducts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should dispatch fetchProducts on mount and return loading state', async () => {
        mockGet.mockReturnValue(new Promise(() => { }));
        const store = createTestStore();
        const { result } = renderHook(() => useProducts(), { wrapper: makeWrapper(store) });
        expect(result.current.loading).toBe(true);
    });

    it('should return products after successful fetch', async () => {
        mockGet.mockResolvedValueOnce({ data: { data: sampleProducts } });
        const store = createTestStore();
        const { result } = renderHook(() => useProducts(), { wrapper: makeWrapper(store) });
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.products).toEqual(sampleProducts);
    });

    it('should return error state on failed fetch', async () => {
        mockGet.mockRejectedValueOnce({ message: 'Network Error' });
        const store = createTestStore();
        const { result } = renderHook(() => useProducts(), { wrapper: makeWrapper(store) });
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.error).toBeTruthy();
    });

    it('should compute categories from product descriptions', async () => {
        mockGet.mockResolvedValueOnce({ data: { data: sampleProducts } });
        const store = createTestStore();
        const { result } = renderHook(() => useProducts(), { wrapper: makeWrapper(store) });
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.categories).toContain('All Items');
        expect(result.current.categories).toContain('Electronics');
        expect(result.current.categories).toContain('Clothing');
        expect(result.current.categories).not.toContain('');
    });

    it('should return all products when no activeCategory provided', async () => {
        mockGet.mockResolvedValueOnce({ data: { data: sampleProducts } });
        const store = createTestStore();
        const { result } = renderHook(() => useProducts(), { wrapper: makeWrapper(store) });
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.products).toHaveLength(sampleProducts.length);
    });

    it('should return all products when activeCategory is "All Items"', async () => {
        mockGet.mockResolvedValueOnce({ data: { data: sampleProducts } });
        const store = createTestStore();
        const { result } = renderHook(() => useProducts('All Items'), { wrapper: makeWrapper(store) });
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.products).toHaveLength(sampleProducts.length);
    });

    it('should filter products by activeCategory', async () => {
        mockGet.mockResolvedValueOnce({ data: { data: sampleProducts } });
        const store = createTestStore();
        const { result } = renderHook(() => useProducts('Electronics'), { wrapper: makeWrapper(store) });
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.products).toHaveLength(2);
        expect(result.current.products.every((p) => (p as any).description === 'Electronics')).toBe(true);
    });

    it('should refresh products when refresh is called', async () => {
        mockGet.mockResolvedValue({ data: { data: sampleProducts } });
        const store = createTestStore();
        const { result } = renderHook(() => useProducts(), { wrapper: makeWrapper(store) });
        await waitFor(() => expect(result.current.loading).toBe(false));

        await act(async () => {
            result.current.refresh();
        });

        expect(mockGet).toHaveBeenCalledTimes(2);
    });
});
