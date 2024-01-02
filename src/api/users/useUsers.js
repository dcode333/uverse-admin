import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUsers = async ({ token }) => {
    try {
        const response = await axios.get(`/api/get-all-users/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Fetch Users Failed');
    }
};


const useUsers = (token) => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => fetchUsers({ token }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
};

export { useUsers };
