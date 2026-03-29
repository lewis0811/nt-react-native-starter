import axios, { AxiosInstance } from 'axios';
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
    apiClient.interceptors.request.clear && apiClient.interceptors.request.clear();
    apiClient.interceptors.request.use(async (config) => {
        try {
            const state = getState();
            const token = state?.auth?.token;
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (e) {
            // ignore
        }
        return config;
    });

    apiClient.interceptors.response.clear && apiClient.interceptors.response.clear();
    apiClient.interceptors.response.use(
        (resp) => resp,
        async (error) => {
            try {
                const status = error?.response?.status;
                if (status === 401 || status === 403) {
                    onAuthFailed();
                }
            } catch (e) {
                // ignore
            }
            return Promise.reject(error);
        }
    );
};
