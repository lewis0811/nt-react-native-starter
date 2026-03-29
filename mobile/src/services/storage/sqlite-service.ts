import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const DB_NAME = 'app.db';

let dbInstance: SQLite.SQLiteDatabase | null = null;

export async function openDB(): Promise<SQLite.SQLiteDatabase> {
    if (dbInstance) return dbInstance;
    dbInstance = await SQLite.openDatabase({ name: DB_NAME, location: 'default' });

    // Create users table if not exists
    await dbInstance.executeSql(
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

    return dbInstance;
}

export async function closeDB(): Promise<void> {
    if (!dbInstance) return;
    try {
        await dbInstance.close();
    } catch (e) {
        // ignore
    } finally {
        dbInstance = null;
    }
}

export default {
    openDB,
    closeDB,
};
