import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginApi, retrieveUserSession, storeUserSession, removeUserSession } from '../services/api-service';
import { saveUserProfile, getUserProfile, deleteUserProfile } from '../services/profile-repo';
import { AuthState, LoginCredentials } from '../types/auth';

const initialState: AuthState = {
    user: null,
    token: null,
    isInitializing: true,
    loading: false,
    error: null,
};

export const initAuth = createAsyncThunk('auth/init', async () => {
    const session = await retrieveUserSession();
    if (!session?.token) return { token: null, user: null };

    const token = session.token;
    const userId = session.userId;

    let user = null;
    if (userId) {
        const profile = await getUserProfile(userId);
        if (profile) {
            user = {
                id: profile.id,
                username: profile.username,
                email: profile.email,
                firstName: profile.firstName,
                lastName: profile.lastName,
                age: profile.age,
                role: profile.role === 'admin' ? 'admin' : 'user',
            };
        }
    }
    return { token, user };
});


export const login = createAsyncThunk('auth/login', async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
        const result = await loginApi(credentials);
        const token = result?.token;
        const user = result?.user;
        if (token) {
            await storeUserSession(token, user?.id ? String(user.id) : undefined);
        }
        if (user && user.id) {
            await saveUserProfile({
                id: String(user.id),
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                role: user.role,
            });
        }
        return { token, user };
    } catch (e: unknown) {
        let message = 'Login failed';
        if (typeof e === 'object' && e !== null) {
            const err: any = e;
            message = err?.response?.data?.message || err?.message || message;
        }
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
        builder.addCase(initAuth.pending, (state) => {
            state.isInitializing = true;
        });
        builder.addCase(initAuth.fulfilled, (state, action) => {
            state.isInitializing = false;
            state.token = action.payload.token;
            const pu = action.payload.user;
            state.user = pu
                ? {
                    id: pu.id,
                    username: pu.username,
                    email: pu.email,
                    firstName: pu.firstName,
                    lastName: pu.lastName,
                    age: pu.age,
                    role: pu.role === 'admin' ? 'admin' : 'user',
                }
                : null;
        });
        builder.addCase(initAuth.rejected, (state) => {
            state.isInitializing = false;
        });

        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            const pu = action.payload.user;
            state.user = pu
                ? {
                    id: pu.id,
                    username: pu.username,
                    email: pu.email,
                    firstName: pu.firstName,
                    lastName: pu.lastName,
                    age: pu.age,
                    role: pu.role === 'admin' ? 'admin' : 'user',
                }
                : null;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || 'Login failed';
        });

        builder.addCase(logout.fulfilled, (state) => {
            state.token = null;
            state.user = null;
        });
    },
});

export default authSlice.reducer;
