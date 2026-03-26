import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import apiReducer from '../src/slices/api-slice';
import useApiData from '../src/hooks/use-api-data';
import { apiClient } from '../src/services/api-client';

jest.mock('../src/services/api-client', () => ({
    apiClient: { get: jest.fn() },
}));

const mockGet = apiClient.get as jest.Mock;

const makeWrapper = (store: any) =>
    ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
    );

const createTestStore = () =>
    configureStore({ reducer: { api: apiReducer } });

describe('useApiData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should dispatch fetchApiData on mount and show loading', () => {
        mockGet.mockReturnValue(new Promise(() => { }));
        const store = createTestStore();
        const { result } = renderHook(() => useApiData(), { wrapper: makeWrapper(store) });
        expect(result.current.loading).toBe(true);
    });

    it('should return data after successful fetch', async () => {
        const items = [{ id: 1, name: 'Product' }];
        mockGet.mockResolvedValueOnce({ data: { data: items } });
        const store = createTestStore();
        const { result } = renderHook(() => useApiData(), { wrapper: makeWrapper(store) });
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.apiData).toEqual(items);
        expect(result.current.error).toBeNull();
    });

    it('should return error when fetch fails', async () => {
        mockGet.mockRejectedValueOnce({ message: 'Server unavailable' });
        const store = createTestStore();
        const { result } = renderHook(() => useApiData(), { wrapper: makeWrapper(store) });
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.error).toBeTruthy();
        expect(result.current.apiData).toEqual([]);
    });

    it('should return initially empty data array', () => {
        mockGet.mockReturnValue(new Promise(() => { }));
        const store = createTestStore();
        const { result } = renderHook(() => useApiData(), { wrapper: makeWrapper(store) });
        expect(Array.isArray(result.current.apiData)).toBe(true);
    });
});
