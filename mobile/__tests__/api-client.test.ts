import { apiClient, setupApiInterceptors } from '../src/services/api-client';

describe('api-client', () => {
    it('should export a valid apiClient axios instance', () => {
        expect(apiClient).toBeDefined();
        expect(typeof apiClient.get).toBe('function');
        expect(typeof apiClient.post).toBe('function');
    });

    describe('setupApiInterceptors', () => {
        let capturedRequestHandler: ((config: any) => Promise<any>) | null = null;
        let capturedResponseSuccess: ((resp: any) => any) | null = null;
        let capturedResponseError: ((error: any) => Promise<any>) | null = null;

        beforeEach(() => {
            capturedRequestHandler = null;
            capturedResponseSuccess = null;
            capturedResponseError = null;

            jest.spyOn(apiClient.interceptors.request, 'use').mockImplementation((handler: any) => {
                capturedRequestHandler = handler;
                return 0;
            });
            jest.spyOn(apiClient.interceptors.response, 'use').mockImplementation((success: any, error: any) => {
                capturedResponseSuccess = success;
                capturedResponseError = error;
                return 0;
            });
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should register request and response interceptors without throwing', () => {
            const getState = jest.fn().mockReturnValue({ auth: { token: 'tok' } });
            const onAuthFailed = jest.fn();
            expect(() => setupApiInterceptors({ getState, onAuthFailed })).not.toThrow();
            expect(apiClient.interceptors.request.use).toHaveBeenCalled();
            expect(apiClient.interceptors.response.use).toHaveBeenCalled();
        });

        it('should add Authorization header when token is present', async () => {
            const getState = jest.fn().mockReturnValue({ auth: { token: 'test-token' } });
            setupApiInterceptors({ getState, onAuthFailed: jest.fn() });

            const config: any = { headers: {} };
            const result = await capturedRequestHandler!(config);
            expect(result.headers.Authorization).toBe('Bearer test-token');
        });

        it('should not add Authorization header when no token', async () => {
            const getState = jest.fn().mockReturnValue({ auth: {} });
            setupApiInterceptors({ getState, onAuthFailed: jest.fn() });

            const config: any = { headers: {} };
            const result = await capturedRequestHandler!(config);
            expect(result.headers.Authorization).toBeUndefined();
        });

        it('should pass through successful responses', async () => {
            setupApiInterceptors({ getState: jest.fn().mockReturnValue({}), onAuthFailed: jest.fn() });

            const resp = { data: { items: [] }, status: 200 };
            const result = capturedResponseSuccess!(resp);
            expect(result).toBe(resp);
        });

        it('should call onAuthFailed and reject on 401 error', async () => {
            const onAuthFailed = jest.fn();
            setupApiInterceptors({ getState: jest.fn().mockReturnValue({}), onAuthFailed });

            const error = { response: { status: 401 } };
            await expect(capturedResponseError!(error)).rejects.toEqual(error);
            expect(onAuthFailed).toHaveBeenCalledTimes(1);
        });

        it('should call onAuthFailed and reject on 403 error', async () => {
            const onAuthFailed = jest.fn();
            setupApiInterceptors({ getState: jest.fn().mockReturnValue({}), onAuthFailed });

            const error = { response: { status: 403 } };
            await expect(capturedResponseError!(error)).rejects.toEqual(error);
            expect(onAuthFailed).toHaveBeenCalledTimes(1);
        });

        it('should reject but not call onAuthFailed on non-auth errors', async () => {
            const onAuthFailed = jest.fn();
            setupApiInterceptors({ getState: jest.fn().mockReturnValue({}), onAuthFailed });

            const error = { response: { status: 500 } };
            await expect(capturedResponseError!(error)).rejects.toEqual(error);
            expect(onAuthFailed).not.toHaveBeenCalled();
        });

        it('should reject gracefully when error has no response', async () => {
            const onAuthFailed = jest.fn();
            setupApiInterceptors({ getState: jest.fn().mockReturnValue({}), onAuthFailed });

            const error = new Error('Network Error');
            await expect(capturedResponseError!(error)).rejects.toEqual(error);
            expect(onAuthFailed).not.toHaveBeenCalled();
        });
    });
});
