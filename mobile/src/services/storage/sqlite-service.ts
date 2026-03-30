import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const DB_NAME = 'app.db';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export function openDB(): Promise<SQLite.SQLiteDatabase> {
    if (dbPromise) return dbPromise;

    dbPromise = (async () => {
        try {
            const db = await SQLite.openDatabase({ name: DB_NAME, location: 'default' });

            await db.executeSql(
                `CREATE TABLE IF NOT EXISTS users (
                    id TEXT PRIMARY KEY,
                    username TEXT,
                    email TEXT,
                    firstName TEXT,
                    lastName TEXT,
                    age INTEGER,
                    role TEXT
                );`
            );

            return db;
        } catch (error) {
            dbPromise = null;
            console.error('Error initializing database:', error);
            throw error;
        }
    })();

    return dbPromise;
}

export async function closeDB(): Promise<void> {
    if (!dbPromise) return;
    try {
        const db = await dbPromise;
        await db.close();
    } catch (e) {
        console.error('Error closing database:', e);
    } finally {
        dbPromise = null;
    }
}

export default {
    openDB,
    closeDB,
};