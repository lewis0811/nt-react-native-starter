import EncryptedStorage from 'react-native-encrypted-storage';

export const storeUserSession = async (token: string, userId: string) => {
    try {
        const payload = JSON.stringify({ token, userId });
        await EncryptedStorage.setItem('user_session', payload);
    } catch (error) {
        console.log('Error storing token:', error);
    }
};

export const retrieveUserSession = async (): Promise<{ token: string; userId?: string } | null> => {
    try {
        const raw = await EncryptedStorage.getItem('user_session');
        if (!raw) return null;
        try {
            return JSON.parse(raw);
        } catch (e) {
            return { token: raw } as any;
        }
    } catch (error) {
        console.log('Error retrieving token:', error);
        return null;
    }
};

export const removeUserSession = async () => {
    try {
        await EncryptedStorage.removeItem('user_session');
    } catch (error) {
        console.log('Error removing token:', error);
    }
};
