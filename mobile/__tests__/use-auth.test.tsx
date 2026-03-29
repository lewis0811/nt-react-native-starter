import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../src/reducers/root-reducer';
import useAuth from '../src/hooks/use-auth';
import * as apiService from '../src/services/api-service';
import * as profileRepo from '../src/services/profile-repo';

jest.mock('../src/services/api-service', () => ({
    loginApi: jest.fn(),
    retrieveUserSession: jest.fn(),
    storeUserSession: jest.fn(),
    removeUserSession: jest.fn(),
}));

jest.mock('../src/services/profile-repo', () => ({
    saveUserProfile: jest.fn(),
    getUserProfile: jest.fn(),
    deleteUserProfile: jest.fn(),
}));

const mockLoginApi = apiService.loginApi as jest.Mock;
const mockRetrieveSession = apiService.retrieveUserSession as jest.Mock;
const mockStoreSession = apiService.storeUserSession as jest.Mock;
const mockRemoveSession = apiService.removeUserSession as jest.Mock;
const mockSaveProfile = profileRepo.saveUserProfile as jest.Mock;
const mockDeleteProfile = profileRepo.deleteUserProfile as jest.Mock;

const mockUser = {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    age: 25,
    role: 'user' as const,
};

const createTestStore = () => configureStore({ reducer: rootReducer });

const makeWrapper = (store: ReturnType<typeof createTestStore>) => {
    return ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
    );
};

describe('useAuth', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockStoreSession.mockResolvedValue(null);
        mockRemoveSession.mockResolvedValue(null);
        mockSaveProfile.mockResolvedValue(undefined);
        mockDeleteProfile.mockResolvedValue(undefined);
    });

    it('should return initial unauthenticated state', () => {
        const store = createTestStore();
        const { result } = renderHook(() => useAuth(), { wrapper: makeWrapper(store) });
        expect(result.current.user).toBeNull();
        expect(result.current.token).toBeNull();
        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should return isAuthenticated=true when token is set', async () => {
        const store = createTestStore();
        mockRetrieveSession.mockResolvedValueOnce(null);
        mockLoginApi.mockResolvedValueOnce({ token: 'auth-token', user: mockUser });

        const { result } = renderHook(() => useAuth(), { wrapper: makeWrapper(store) });

        await act(async () => {
            await result.current.signIn({ username: 'user', password: 'pass' });
        });

        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.token).toBe('auth-token');
    });

    it('should dispatch login and resolve with token and user', async () => {
        const store = createTestStore();
        const mockUser = {
            id: '10',
            username: 'alice',
            email: 'alice@test.com',
            firstName: 'Alice',
            lastName: 'Smith',
            age: 30,
            role: 'user' as const,
        };
        mockLoginApi.mockResolvedValueOnce({ token: 'token-123', user: mockUser });

        const { result } = renderHook(() => useAuth(), { wrapper: makeWrapper(store) });

        await act(async () => {
            await result.current.signIn({ username: 'alice', password: 'secret' });
        });

        expect(result.current.user?.username).toBe('alice');
        expect(result.current.token).toBe('token-123');
    });

    it('should set error state when signIn fails', async () => {
        const store = createTestStore();
        mockLoginApi.mockRejectedValueOnce({
            response: { data: { error: { message: 'Invalid credentials' } } },
        });

        const { result } = renderHook(() => useAuth(), { wrapper: makeWrapper(store) });

        await act(async () => {
            try {
                await result.current.signIn({ username: 'bad', password: 'bad' });
            } catch {
                // expected
            }
        });

        await waitFor(() => {
            expect(result.current.error).toBe('Invalid credentials');
        });
    });

    it('should clear user and token after signOut', async () => {
        const store = createTestStore();
        mockLoginApi.mockResolvedValueOnce({ token: 'tok', user: mockUser });
        mockRetrieveSession.mockResolvedValueOnce({ token: 'tok' });

        const { result } = renderHook(() => useAuth(), { wrapper: makeWrapper(store) });

        await act(async () => {
            await result.current.signIn({ username: 'u', password: 'p' });
        });

        await act(async () => {
            await result.current.signOut();
        });

        expect(result.current.token).toBeNull();
        expect(result.current.user).toBeNull();
        expect(result.current.isAuthenticated).toBe(false);
    });

    it('should expose isInitializing from store state', () => {
        const store = createTestStore();
        const { result } = renderHook(() => useAuth(), { wrapper: makeWrapper(store) });
        expect(typeof result.current.isInitializing).toBe('boolean');
    });
});
