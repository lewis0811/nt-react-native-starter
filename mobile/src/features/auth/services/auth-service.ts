import { apiClient } from '../../../services/api/api-client';

export const loginApi = async (data: any) => {
    const response = await apiClient.post('/login', data);
    return response.data.data;
};

export default {
    loginApi,
};
