import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi, retrieveUserSession, storeUserSession, removeUserSession } from '../services/api-service';
import { saveUserProfile, getUserProfile, deleteUserProfile } from '../services/profile-repo';
import { AuthState, LoginCredentials } from '../types/auth';
import { User } from '../models/user';

const initialState: AuthState = {
    user: null,
    token: null,
    isInitializing: true,
    loading: false,
    error: null,
};

const mapUserResponse = (pu: any): User | null => {
    if (!pu) return null;
    return {
        id: String(pu.id),
        username: pu.username,
        email: pu.email,
        firstName: pu.firstName,
        lastName: pu.lastName,
        age: pu.age,
        role: pu.role === 'admin' ? 'admin' : 'user',
    };
};

export const initAuth = createAsyncThunk('auth/init', async () => {
    const session = await retrieveUserSession();
    if (!session?.token) return { token: null, user: null };

    const token = session.token;
    const userId = session.userId;

    let user = null;
    if (userId) {
        const profile = await getUserProfile(userId);
        user = mapUserResponse(profile);
    }
    return { token, user };
});

export const login = createAsyncThunk('auth/login', async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
        const result = await loginApi(credentials);
        const token = result?.token;
        const user = mapUserResponse(result?.user);

        if (token && user) {
            await Promise.all([
                storeUserSession(token, user.id),
                saveUserProfile(user)
            ]);
        }

        return { token, user };
    } catch (e: any) {
        const message = e.response?.data?.error?.message || 'Login failed';
        return rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    const session = await retrieveUserSession();
    const userId = session?.userId;

    await removeUserSession();
    if (userId) {
        await deleteUserProfile(String(userId));
    }
    return {};
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initAuth.pending, (state) => {
                state.isInitializing = true;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initAuth.fulfilled, (state, action) => {
                state.isInitializing = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(initAuth.rejected, (state) => {
                state.isInitializing = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.token = null;
                state.user = null;
            });
    },
});

export default authSlice.reducer;
