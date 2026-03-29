import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { login, logout } from '../store/auth-slice';
import { LoginCredentials } from '../types/auth';

export default function useAuth() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((s) => s.auth.user);
    const token = useAppSelector((s) => s.auth.token);
    const isInitializing = useAppSelector((s) => s.auth.isInitializing);
    const loading = useAppSelector((s) => s.auth.loading);
    const error = useAppSelector((s) => s.auth.error);

    const signIn = useCallback(async (credentials: LoginCredentials) => {
        return dispatch(login(credentials)).unwrap();
    }, [dispatch]);

    const signOut = useCallback(async () => {
        return dispatch(logout()).unwrap();
    }, [dispatch]);

    const isAuthenticated = Boolean(token);

    return {
        user,
        token,
        isInitializing,
        loading,
        error,
        isAuthenticated,
        signIn,
        signOut,
    } as const;
}
