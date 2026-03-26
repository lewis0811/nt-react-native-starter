import { configureStore } from '@reduxjs/toolkit';
import apiReducer, {
    fetchApiData,
    selectApiData,
    selectApiLoading,
    selectApiError,
} from '../src/slices/api-slice';
import { apiClient } from '../src/services/api-client';

jest.mock('../src/services/api-client', () => ({
    apiClient: { get: jest.fn() },
}));

const mockGet = apiClient.get as jest.Mock;

const createTestStore = () =>
    configureStore({ reducer: { api: apiReducer } });

describe('api-slice', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should have correct initial state', () => {
        const store = createTestStore();
        const state = store.getState().api;
        expect(state.data).toEqual([]);
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
    });

    describe('fetchApiData', () => {
        it('should set loading=true on pending', () => {
            mockGet.mockReturnValue(new Promise(() => { }));
            const store = createTestStore();
            store.dispatch(fetchApiData());
            expect(store.getState().api.loading).toBe(true);
            expect(store.getState().api.error).toBeNull();
        });

        it('should populate data on fulfilled with nested data', async () => {
            const items = [{ id: 1, name: 'Item 1' }];
            mockGet.mockResolvedValueOnce({ data: { data: items } });
            const store = createTestStore();
            await store.dispatch(fetchApiData());
            const state = store.getState().api;
            expect(state.loading).toBe(false);
            expect(state.data).toEqual(items);
            expect(state.error).toBeNull();
        });

        it('should populate data on fulfilled with direct array', async () => {
            const items = [{ id: 2, name: 'Item 2' }];
            mockGet.mockResolvedValueOnce({ data: items });
            const store = createTestStore();
            await store.dispatch(fetchApiData());
            expect(store.getState().api.data).toEqual(items);
        });

        it('should fall back to empty array when payload is not an array and has no .data', async () => {
            mockGet.mockResolvedValueOnce({ data: { something: 'else' } });
            const store = createTestStore();
            await store.dispatch(fetchApiData());
            expect(store.getState().api.data).toEqual([]);
        });

        it('should set error from response data on rejected', async () => {
            const apiError = { response: { data: { message: 'Fetch failed' } }, message: 'Request error' };
            mockGet.mockRejectedValueOnce(apiError);
            const store = createTestStore();
            await store.dispatch(fetchApiData());
            const state = store.getState().api;
            expect(state.loading).toBe(false);
            expect(state.error).toBe('Fetch failed');
        });

        it('should set error from message when no response data', async () => {
            mockGet.mockRejectedValueOnce({ message: 'Network Error' });
            const store = createTestStore();
            await store.dispatch(fetchApiData());
            expect(store.getState().api.error).toBe('Network Error');
        });

        it('should set default error message when nothing is provided', async () => {
            mockGet.mockRejectedValueOnce(new Error());
            const store = createTestStore();
            await store.dispatch(fetchApiData());
            expect(store.getState().api.error).toBeTruthy();
        });
    });

    describe('selectors', () => {
        it('selectApiData returns api data array', () => {
            const state = { api: { data: [{ id: 1 }], loading: false, error: null } };
            expect(selectApiData(state)).toEqual([{ id: 1 }]);
        });

        it('selectApiLoading returns loading flag', () => {
            const state = { api: { data: [], loading: true, error: null } };
            expect(selectApiLoading(state)).toBe(true);
        });

        it('selectApiError returns error string', () => {
            const state = { api: { data: [], loading: false, error: 'Some error' } };
            expect(selectApiError(state)).toBe('Some error');
        });
    });
});
