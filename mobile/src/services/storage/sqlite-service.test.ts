jest.mock('react-native-sqlite-storage', () => ({
    __esModule: true,
    default: {
        enablePromise: jest.fn(),
        openDatabase: jest.fn(),
    },
}));

describe('sqlite-service', () => {
    let openDB: () => Promise<any>;
    let closeDB: () => Promise<void>;
    let mockOpenDatabase: jest.Mock;
    let mockExecuteSql: jest.Mock;
    let mockClose: jest.Mock;

    beforeEach(() => {
        mockExecuteSql = jest.fn().mockResolvedValue([]);
        mockClose = jest.fn().mockResolvedValue(undefined);

        jest.isolateModules(() => {
            const SQLite = require('react-native-sqlite-storage').default;
            mockOpenDatabase = SQLite.openDatabase;
            mockOpenDatabase.mockResolvedValue({ executeSql: mockExecuteSql, close: mockClose });

            const service = require('./sqlite-service');
            openDB = service.openDB;
            closeDB = service.closeDB;
        });
    });

    describe('openDB', () => {
        test('opens database and creates users table', async () => {
            const db = await openDB();

            expect(mockOpenDatabase).toHaveBeenCalledWith({ name: 'app.db', location: 'default' });
            expect(mockExecuteSql).toHaveBeenCalledWith(
                expect.stringContaining('CREATE TABLE IF NOT EXISTS users')
            );
            expect(db).toMatchObject({ executeSql: mockExecuteSql, close: mockClose });
        });

        test('returns same promise on subsequent calls (singleton)', async () => {
            const db1 = await openDB();
            const db2 = await openDB();

            expect(db1).toBe(db2);
            expect(mockOpenDatabase).toHaveBeenCalledTimes(1);
        });

        test('resets dbPromise and throws when openDatabase fails', async () => {
            mockOpenDatabase.mockRejectedValueOnce(new Error('Open failed'));

            await expect(openDB()).rejects.toThrow('Open failed');

            const db = await openDB();
            expect(db).toBeTruthy();
            expect(mockOpenDatabase).toHaveBeenCalledTimes(2);
        });

        test('resets dbPromise and throws when CREATE TABLE fails', async () => {
            mockExecuteSql.mockRejectedValueOnce(new Error('Table error'));

            await expect(openDB()).rejects.toThrow('Table error');
        });
    });

    describe('closeDB', () => {
        test('does nothing when db has not been opened', async () => {
            await expect(closeDB()).resolves.toBeUndefined();
            expect(mockClose).not.toHaveBeenCalled();
        });

        test('closes db and resets dbPromise', async () => {
            await openDB();
            await closeDB();

            expect(mockClose).toHaveBeenCalledTimes(1);

            await openDB();
            expect(mockOpenDatabase).toHaveBeenCalledTimes(2);
        });

        test('resets dbPromise even when close throws', async () => {
            await openDB();
            mockClose.mockRejectedValueOnce(new Error('Close failed'));

            await expect(closeDB()).resolves.toBeUndefined(); // should not throw

            const db = await openDB();
            expect(db).toBeTruthy();
            expect(mockOpenDatabase).toHaveBeenCalledTimes(2);
        });
    });
});
