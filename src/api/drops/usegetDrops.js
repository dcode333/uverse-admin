import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchDrops = async ({ token }) => {
    try {
        const response = await axios.get(`/api/drop/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response.data;

    } catch (error) {

        throw new Error(error.message || 'Fetch Drops Failed');
    }
};

const fetchInterests = async ({ token }) => {
    try {
        const response = await axios.get(`/api/allinterest/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data?.map(({ id, name }) => ({ id, label: name }));

    } catch (error) {

        throw new Error(error.message || 'Fetch Interests Failed');
    }
};




const useDrops = ({ token }) => {
    return useQuery({
        queryKey: ['drops'],
        queryFn: () => fetchDrops({ token }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
}

const useInterests = ({ token }) => {
    return useQuery({
        queryKey: ['interests'],
        queryFn: () => fetchInterests({ token }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
}


export { useDrops, useInterests };