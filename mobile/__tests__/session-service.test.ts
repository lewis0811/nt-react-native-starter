import EncryptedStorage from 'react-native-encrypted-storage';
import {
    storeUserSession,
    retrieveUserSession,
    removeUserSession,
} from '../src/services/session-service';

jest.mock('react-native-encrypted-storage', () => ({
    __esModule: true,
    default: {
        setItem: jest.fn().mockResolvedValue(null),
        getItem: jest.fn().mockResolvedValue(null),
        removeItem: jest.fn().mockResolvedValue(null),
        clear: jest.fn().mockResolvedValue(null),
    },
}));

describe('session-service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (EncryptedStorage.setItem as jest.Mock).mockResolvedValue(null);
        (EncryptedStorage.getItem as jest.Mock).mockResolvedValue(null);
        (EncryptedStorage.removeItem as jest.Mock).mockResolvedValue(null);
    });

    describe('storeUserSession', () => {
        it('should store token and userId as JSON', async () => {
            await storeUserSession('my-token', 'user-123');
            expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
                'user_session',
                JSON.stringify({ token: 'my-token', userId: 'user-123' })
            );
        });

        it('should store token without userId', async () => {
            await storeUserSession('only-token');
            expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
                'user_session',
                JSON.stringify({ token: 'only-token', userId: undefined })
            );
        });

        it('should handle storage error gracefully', async () => {
            (EncryptedStorage.setItem as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));
            await expect(storeUserSession('token')).resolves.toBeUndefined();
        });
    });

    describe('retrieveUserSession', () => {
        it('should return null when nothing is stored', async () => {
            (EncryptedStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
            const result = await retrieveUserSession();
            expect(result).toBeNull();
        });

        it('should return parsed session object', async () => {
            const session = { token: 'abc', userId: '42' };
            (EncryptedStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(session));
            const result = await retrieveUserSession();
            expect(result).toEqual(session);
        });

        it('should return { token: raw } when stored value is not valid JSON', async () => {
            (EncryptedStorage.getItem as jest.Mock).mockResolvedValueOnce('plain-token-string');
            const result = await retrieveUserSession();
            expect(result).toEqual({ token: 'plain-token-string' });
        });

        it('should return null on retrieval error', async () => {
            (EncryptedStorage.getItem as jest.Mock).mockRejectedValueOnce(new Error('Read error'));
            const result = await retrieveUserSession();
            expect(result).toBeNull();
        });
    });

    describe('removeUserSession', () => {
        it('should remove user_session key', async () => {
            await removeUserSession();
            expect(EncryptedStorage.removeItem).toHaveBeenCalledWith('user_session');
        });

        it('should handle removal error gracefully', async () => {
            (EncryptedStorage.removeItem as jest.Mock).mockRejectedValueOnce(new Error('Remove error'));
            await expect(removeUserSession()).resolves.toBeUndefined();
        });
    });
});
