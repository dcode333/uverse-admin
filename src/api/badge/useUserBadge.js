import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUserBadges = async ({ token, userId }) => {
    try {
        const response = await axios.get(`/api/getuserbadges/?user_id=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {

        throw new Error(error.message || 'Fetch User Badges Failed');
    }
};


const useUserBadge = ({ token, userId }) => {
    return useQuery({
        queryKey: ['userbadges', userId],
        queryFn: () => fetchUserBadges({ token, userId }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
};


export { useUserBadge };
