import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUserCheckins = async ({ token, userId }) => {
    try {
        const response = await axios.get(`/api/getusercheckins/?user_id=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {

        throw new Error(error.message || 'Fetch User Checkins Failed');
    }
};


const useUserCheckin = ({ token, userId }) => {
    return useQuery({
        queryKey: ['usercheckins', userId],
        queryFn: () => fetchUserCheckins({ token, userId }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
};


export { useUserCheckin };
