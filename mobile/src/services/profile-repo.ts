import { openDB } from './sqlite-service';
import { User } from '../types/user';

export async function saveUserProfile(user: User): Promise<void> {
    const db = await openDB();
    const sql = `INSERT OR REPLACE INTO users (id, username, email, firstName, lastName, age, role) VALUES (?, ?, ?, ?, ?, ?, ?);`;
    await db.executeSql(sql, [
        String(user.id),
        user.username,
        user.email,
        user.firstName,
        user.lastName,
        user.age,
        user.role,
    ]);
}

export async function getUserProfile(id: string): Promise<User | null> {
    const db = await openDB();
    const [result] = await db.executeSql('SELECT * FROM users WHERE id = ?;', [String(id)]);
    if (result.rows.length === 0) return null;

    const row = result.rows.item(0);
    return {
        id: row.id,
        username: row.username,
        email: row.email,
        firstName: row.firstName,
        lastName: row.lastName,
        age: row.age,
        role: row.role === 'admin' ? 'admin' : 'user',
    } as User;
}

export async function deleteUserProfile(id: string): Promise<void> {
    const db = await openDB();
    await db.executeSql('DELETE FROM users WHERE id = ?;', [String(id)]);
}

export default {
    saveUserProfile,
    getUserProfile,
    deleteUserProfile,
};
