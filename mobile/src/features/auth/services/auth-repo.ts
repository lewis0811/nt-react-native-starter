import axios from 'axios';
import { API_URL } from '../../../services/api/api-config';

export const loginApi = async (data: any) => {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data && response.data.data ? response.data.data : response.data;
};

