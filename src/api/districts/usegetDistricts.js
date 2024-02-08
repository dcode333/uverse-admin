import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchDistricts = async ({ token }) => {
    try {
        const response = await axios.get(`/api/district/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {

        throw new Error(error.message || 'Fetch Districts Failed');
    }
};

const fetchDistrict = async ({ token, districtId }) => {
    try {
        const response = await axios.get(`/api/district/${districtId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {

        throw new Error(error.message || 'Fetch Districts Failed');
    }
};


const useDistricts = ({ token }) => {
    return useQuery({
        queryKey: ['districts'],
        queryFn: () => fetchDistricts({ token }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
}

const useDistrict = ({ token, districtId }) => {
    return useQuery({
        queryKey: ['district', districtId],
        queryFn: () => fetchDistrict({ token, districtId }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
}



export { useDistricts, useDistrict };