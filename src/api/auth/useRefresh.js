import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const fetchUserRefresh = async ({ token, userId }) => {
    try {
        const response = await axios.get(`/api/getuserprofile/${userId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Refresh failed');
    }
};


const useRefresh = () => {
    return useMutation({
        mutationKey: ['admin'],
        mutationFn: fetchUserRefresh,
    })
};

export { useRefresh };
