import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { API_URL } from './api-config';

export const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 15000,
});

type SetupOpts = {
    getState: () => any;
    onAuthFailed: () => void;
};

export const setupApiInterceptors = ({ getState, onAuthFailed }: SetupOpts) => {
    apiClient.interceptors.request.clear?.();

    apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        try {
            const token = getState()?.auth?.token;
            if (token) {
                config.headers.set('Authorization', `Bearer ${token}`);
            }
        } catch (e) {
            console.error('Error initializing token in interceptor:', e);
        }
        return config;
    });

    apiClient.interceptors.response.clear?.();

    apiClient.interceptors.response.use(
        (resp) => resp,
        (error: AxiosError) => {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                onAuthFailed();
            }
            return Promise.reject(error);
        }
    );
};