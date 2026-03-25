export { storeUserSession, retrieveUserSession, removeUserSession } from './session-service';
export { API_URL } from '../config/api-config';
export { loginApi } from './auth-repo';
export { apiClient, setupApiInterceptors } from './api-client';

// Note: external API removed (deprecated). No fetchData export retained.
export const apiService = {} as const;