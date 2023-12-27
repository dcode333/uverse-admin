import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchBadgeTitle = async ({ token }) => {
    try {
        const response = await axios.get(`/api/badges/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data?.results.map(({ id, title }) => ({ id, label: title }));

    } catch (error) {
        console.log(error.message)
        throw new Error(error.message || 'Fetch Checkins Failed');
    }
};


const useBadgeTitle = (token) => {
    return useQuery({
        queryKey: ['badgestitle'],
        queryFn: () => fetchBadgeTitle({ token }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
};

export { useBadgeTitle };
