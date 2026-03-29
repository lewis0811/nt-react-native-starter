export { storeUserSession, retrieveUserSession, removeUserSession } from '../storage/session-service';
export { API_URL } from './api-config';
export { loginApi } from '../../features/auth/services/auth-repo';
export { apiClient, setupApiInterceptors } from './api-client';

// Note: external API removed (deprecated). No fetchData export retained.
export const apiService = {} as const;