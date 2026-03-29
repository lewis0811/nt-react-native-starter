import { configureStore } from '@reduxjs/toolkit';
import authReducer, { initAuth, login, logout } from './auth-slice';
import * as apiService from '../../../services/api/api-service';
import * as profileRepo from '../services/profile-repo';

jest.mock('../../../services/api/api-service', () => ({
    loginApi: jest.fn(),
    retrieveUserSession: jest.fn(),
    storeUserSession: jest.fn(),
    removeUserSession: jest.fn(),
}));

jest.mock('../services/profile-repo', () => ({
    saveUserProfile: jest.fn(),
    getUserProfile: jest.fn(),
    deleteUserProfile: jest.fn(),
}));

const mockLoginApi = apiService.loginApi as jest.Mock;
const mockRetrieveSession = apiService.retrieveUserSession as jest.Mock;
const mockStoreSession = apiService.storeUserSession as jest.Mock;
const mockRemoveSession = apiService.removeUserSession as jest.Mock;
const mockSaveProfile = profileRepo.saveUserProfile as jest.Mock;
const mockGetProfile = profileRepo.getUserProfile as jest.Mock;
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

const createTestStore = () =>
    configureStore({ reducer: { auth: authReducer } });

describe('auth-slice', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockStoreSession.mockResolvedValue(null);
        mockRemoveSession.mockResolvedValue(null);
        mockSaveProfile.mockResolvedValue(undefined);
        mockDeleteProfile.mockResolvedValue(undefined);
    });

    it('should have correct initial state', () => {
        const store = createTestStore();
        const state = store.getState().auth;
        expect(state.user).toBeNull();
        expect(state.token).toBeNull();
        expect(state.isInitializing).toBe(true);
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
    });

    describe('initAuth', () => {
        it('should return null user/token when no session stored', async () => {
            mockRetrieveSession.mockResolvedValueOnce(null);
            const store = createTestStore();
            await store.dispatch(initAuth());
            const state = store.getState().auth;
            expect(state.isInitializing).toBe(false);
            expect(state.token).toBeNull();
            expect(state.user).toBeNull();
        });

        it('should return token without user when session has no userId', async () => {
            mockRetrieveSession.mockResolvedValueOnce({ token: 'session-token' });
            const store = createTestStore();
            await store.dispatch(initAuth());
            const state = store.getState().auth;
            expect(state.isInitializing).toBe(false);
            expect(state.token).toBe('session-token');
            expect(state.user).toBeNull();
        });

        it('should restore user from profile when session has userId', async () => {
            mockRetrieveSession.mockResolvedValueOnce({ token: 'session-token', userId: '1' });
            mockGetProfile.mockResolvedValueOnce(mockUser);
            const store = createTestStore();
            await store.dispatch(initAuth());
            const state = store.getState().auth;
            expect(state.token).toBe('session-token');
            expect(state.user?.username).toBe('testuser');
            expect(state.user?.role).toBe('user');
        });

        it('should restore admin role correctly', async () => {
            mockRetrieveSession.mockResolvedValueOnce({ token: 'token', userId: '2' });
            mockGetProfile.mockResolvedValueOnce({ ...mockUser, role: 'admin' as const });
            const store = createTestStore();
            await store.dispatch(initAuth());
            const state = store.getState().auth;
            expect(state.user?.role).toBe('admin');
        });

        it('should set isInitializing=false even when getUserProfile returns null', async () => {
            mockRetrieveSession.mockResolvedValueOnce({ token: 'tok', userId: '99' });
            mockGetProfile.mockResolvedValueOnce(null);
            const store = createTestStore();
            await store.dispatch(initAuth());
            const state = store.getState().auth;
            expect(state.isInitializing).toBe(false);
            expect(state.user).toBeNull();
        });

        it('should set isInitializing=false on rejection', async () => {
            mockRetrieveSession.mockRejectedValueOnce(new Error('Storage fail'));
            const store = createTestStore();
            await store.dispatch(initAuth());
            const state = store.getState().auth;
            expect(state.isInitializing).toBe(false);
        });
    });

    describe('login', () => {
        it('should set loading=true on pending', () => {
            mockLoginApi.mockReturnValue(new Promise(() => { }));
            const store = createTestStore();
            store.dispatch(login({ username: 'user', password: 'pass' }));
            expect(store.getState().auth.loading).toBe(true);
            expect(store.getState().auth.error).toBeNull();
        });

        it('should store token and set user on fulfilled with user', async () => {
            const loginResult = { token: 'new-token', user: mockUser };
            mockLoginApi.mockResolvedValueOnce(loginResult);
            const store = createTestStore();
            await store.dispatch(login({ username: 'testuser', password: 'pass' }));
            const state = store.getState().auth;
            expect(state.loading).toBe(false);
            expect(state.token).toBe('new-token');
            expect(state.user?.username).toBe('testuser');
            expect(mockStoreSession).toHaveBeenCalledWith('new-token', '1');
            expect(mockSaveProfile).toHaveBeenCalled();
        });

        it('should set error on rejected with rejectWithValue message', async () => {
            const serverError = {
                response: { data: { error: { message: 'Invalid credentials' } } },
                message: 'Request failed',
            };
            mockLoginApi.mockRejectedValueOnce(serverError);
            const store = createTestStore();
            await store.dispatch(login({ username: 'bad', password: 'bad' }));
            const state = store.getState().auth;
            expect(state.loading).toBe(false);
            expect(state.error).toBe('Invalid credentials');
        });
    });

    describe('logout', () => {
        it('should clear token and user on fulfilled', async () => {
            mockRetrieveSession.mockResolvedValueOnce({ token: 'tok', userId: '1' });
            const store = createTestStore();
            await store.dispatch(logout());
            const state = store.getState().auth;
            expect(state.token).toBeNull();
            expect(state.user).toBeNull();
            expect(mockRemoveSession).toHaveBeenCalled();
            expect(mockDeleteProfile).toHaveBeenCalledWith('1');
        });

        it('should not call deleteUserProfile when no userId in session', async () => {
            mockRetrieveSession.mockResolvedValueOnce({ token: 'tok' });
            const store = createTestStore();
            await store.dispatch(logout());
            expect(mockDeleteProfile).not.toHaveBeenCalled();
        });

        it('should still clear state when no session exists', async () => {
            mockRetrieveSession.mockResolvedValueOnce(null);
            const store = createTestStore();
            await store.dispatch(logout());
            const state = store.getState().auth;
            expect(state.token).toBeNull();
            expect(state.user).toBeNull();
        });
    });
});
