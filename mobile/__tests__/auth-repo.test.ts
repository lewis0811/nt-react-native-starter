import axios from 'axios';
import { loginApi } from '../src/services/auth-repo';

jest.mock('axios', () => ({
    __esModule: true,
    default: {
        post: jest.fn(),
    },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('loginApi', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return data.data when response has nested data property', async () => {
        const innerData = { token: 'my-token', user: { id: 1, username: 'testuser' } };
        mockedAxios.post.mockResolvedValueOnce({ data: { data: innerData } });

        const result = await loginApi({ username: 'testuser', password: 'pass123' });

        expect(result).toEqual(innerData);
        expect(mockedAxios.post).toHaveBeenCalledWith(
            expect.stringContaining('/login'),
            { username: 'testuser', password: 'pass123' }
        );
    });

    it('should return data directly when no nested data property', async () => {
        const directData = { token: 'direct-token' };
        mockedAxios.post.mockResolvedValueOnce({ data: directData });

        const result = await loginApi({ username: 'testuser', password: 'pass123' });

        expect(result).toEqual(directData);
    });

    it('should throw error on network failure', async () => {
        const networkError = new Error('Network Error');
        mockedAxios.post.mockRejectedValueOnce(networkError);

        await expect(loginApi({ username: 'user', password: 'pass' })).rejects.toThrow('Network Error');
    });

    it('should throw error on 401 unauthorized', async () => {
        const authError = { response: { status: 401, data: { message: 'Unauthorized' } } };
        mockedAxios.post.mockRejectedValueOnce(authError);

        await expect(loginApi({ username: 'user', password: 'wrong' })).rejects.toEqual(authError);
    });
});
