import { User } from '../../../types';

export interface AuthState {
    user: User | null;
    token: string | null;
    isInitializing: boolean;
    loading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    username: string;
    password: string;
}


