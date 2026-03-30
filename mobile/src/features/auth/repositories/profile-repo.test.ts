import { saveUserProfile, getUserProfile, deleteUserProfile } from './profile-repo';
import { openDB } from '../../../services/storage/sqlite-service';
import type { User } from '../../../types';

jest.mock('../../../services/storage/sqlite-service');

const mockExecuteSql = jest.fn();
const mockDb = { executeSql: mockExecuteSql };

const mockUser: User = {
    id: '1',
    username: 'johndoe',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    role: 'user',
};

beforeEach(() => {
    jest.clearAllMocks();
    (openDB as jest.Mock).mockResolvedValue(mockDb);
});

describe('saveUserProfile', () => {
    test('calls executeSql with correct SQL and values', async () => {
        mockExecuteSql.mockResolvedValue([]);

        await saveUserProfile(mockUser);

        expect(mockExecuteSql).toHaveBeenCalledWith(
            expect.stringContaining('INSERT OR REPLACE INTO users'),
            ['1', 'johndoe', 'john@example.com', 'John', 'Doe', 30, 'user']
        );
    });

    test('propagates error when executeSql fails', async () => {
        mockExecuteSql.mockRejectedValue(new Error('DB error'));

        await expect(saveUserProfile(mockUser)).rejects.toThrow('DB error');
    });
});

describe('getUserProfile', () => {
    test('returns null when no row found', async () => {
        mockExecuteSql.mockResolvedValue([{ rows: { length: 0, item: jest.fn() } }]);

        const result = await getUserProfile('1');

        expect(result).toBeNull();
    });

    test('returns user when row found', async () => {
        const row = { ...mockUser };
        mockExecuteSql.mockResolvedValue([
            { rows: { length: 1, item: () => row } },
        ]);

        const result = await getUserProfile('1');

        expect(result).toEqual(mockUser);
    });

    test('maps unknown role to "user"', async () => {
        const row = { ...mockUser, role: 'moderator' };
        mockExecuteSql.mockResolvedValue([
            { rows: { length: 1, item: () => row } },
        ]);

        const result = await getUserProfile('1');

        expect(result?.role).toBe('user');
    });

    test('maps "admin" role correctly', async () => {
        const row = { ...mockUser, role: 'admin' };
        mockExecuteSql.mockResolvedValue([
            { rows: { length: 1, item: () => row } },
        ]);

        const result = await getUserProfile('1');

        expect(result?.role).toBe('admin');
    });

    test('propagates error when executeSql fails', async () => {
        mockExecuteSql.mockRejectedValue(new Error('Read error'));

        await expect(getUserProfile('1')).rejects.toThrow('Read error');
    });
});

describe('deleteUserProfile', () => {
    test('calls executeSql with correct SQL and id', async () => {
        mockExecuteSql.mockResolvedValue([]);

        await deleteUserProfile('1');

        expect(mockExecuteSql).toHaveBeenCalledWith(
            'DELETE FROM users WHERE id = ?;',
            ['1']
        );
    });

    test('propagates error when executeSql fails', async () => {
        mockExecuteSql.mockRejectedValue(new Error('Delete error'));

        await expect(deleteUserProfile('1')).rejects.toThrow('Delete error');
    });
});
