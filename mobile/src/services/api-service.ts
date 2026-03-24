import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const API_URL = 'http://10.0.2.2:3000';

export const storeUserSession = async (token: string, userId?: string) => {
    try {
        const payload = JSON.stringify({ token, userId });
        await EncryptedStorage.setItem("user_session", payload);
    } catch (error) {
        console.log("Error storing token:", error);
    }
};

export const retrieveUserSession = async (): Promise<{ token: string; userId?: string } | null> => {
    try {
        const raw = await EncryptedStorage.getItem("user_session");
        if (!raw) return null;
        try {
            return JSON.parse(raw);
        } catch (e) {
            return { token: raw };
        }
    } catch (error) {
        console.log("Error retrieving token:", error);
        return null;
    }
};

export const removeUserSession = async () => {
    try {
        await EncryptedStorage.removeItem("user_session");
    } catch (error) {
        console.log("Error removing token:", error);
    }
};


export const loginApi = async (data: any) => {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data && response.data.data ? response.data.data : response.data;
};

export const apiService = {
    fetchData: () => axios.get('https://jsonplaceholder.typicode.com/photos'),
};