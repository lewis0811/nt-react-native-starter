import { apiClient } from '../../../services/api/api-client';
import { loginApi } from './auth-service';

jest.mock('../../../services/api/api-client', () => ({
    apiClient: {
        post: jest.fn(),
    },
}));

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('loginApi', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return data.data when response has nested data property', async () => {
        const innerData = { token: 'my-token', user: { id: 1, username: 'testuser' } };
        mockedApiClient.post.mockResolvedValueOnce({ data: { data: innerData } } as any);

        const result = await loginApi({ username: 'testuser', password: 'pass123' });

        expect(result).toEqual(innerData);
        expect(mockedApiClient.post).toHaveBeenCalledWith(
            '/login',
            { username: 'testuser', password: 'pass123' }
        );
    });

    it('should throw error on network failure', async () => {
        const networkError = new Error('Network Error');
        mockedApiClient.post.mockRejectedValueOnce(networkError);

        await expect(loginApi({ username: 'user', password: 'pass' })).rejects.toThrow('Network Error');
    });

    it('should throw error on 401 unauthorized', async () => {
        const authError = { response: { status: 401, data: { message: 'Unauthorized' } } };
        mockedApiClient.post.mockRejectedValueOnce(authError);

        await expect(loginApi({ username: 'user', password: 'wrong' })).rejects.toEqual(authError);
    });
});
