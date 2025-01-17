import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchApprovedBrands = async ({ token }) => {
    try {

        const response = await axios.get(`/api/all-brand/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                status: 'Approved'
            }
        });

        return response.data;

    } catch (error) {

        throw new Error(error.message || 'Fetch Brands Failed');
    }
};

const fetchPendingBrands = async ({ token }) => {
    try {

        const response = await axios.get(`/api/all-brand/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                status: 'Pending'
            }
        });

        return response.data;

    } catch (error) {

        throw new Error(error.message || 'Fetch Brands Failed');
    }
};

const fetchDeclinedBrands = async ({ token }) => {
    try {

        const response = await axios.get(`/api/all-brand/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                status: 'Declined'
            }
        });

        return response.data;

    } catch (error) {

        throw new Error(error.message || 'Fetch Brands Failed');
    }
};

const fetchBrandsForDistrict = async ({ token }) => {
    try {
        const response = await axios.get(`/api/all-brand/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                status: 'Approved'
            }
        });

        return response.data?.results.map((item) => ({ id: item.id, label: item?.brand_profile?.title }));

    } catch (error) {

        throw new Error(error.message || 'Fetch Interests Failed');
    }
};


const fetchBrandDetail = async ({ token, brandId }) => {
    try {
        const response = await axios.get(`/api/get-brand/${brandId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {

        throw new Error(error.message || 'Fetch Brand requests Failed');
    }
};

const useApprovedBrand = ({ token }) => {
    return useQuery({
        queryKey: ['approvedbrands'],
        queryFn: () => fetchApprovedBrands({ token }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
}

const usePendingBrand = ({ token }) => {
    return useQuery({
        queryKey: ['pendingbrands'],
        queryFn: () => fetchPendingBrands({ token }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
}

const useDeclinedBrand = ({ token }) => {
    return useQuery({
        queryKey: ['declinedbrands'],
        queryFn: () => fetchDeclinedBrands({ token }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
}

const useBrandDetail = ({ token, brandId }) => {
    return useQuery({
        queryKey: ['brand', brandId],
        queryFn: () => fetchBrandDetail({ token, brandId }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
}


const useDistrictBrand = ({ token }) => {
    return useQuery({
        queryKey: ['districtbrands'],
        queryFn: () => fetchBrandsForDistrict({ token }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
}





export { usePendingBrand, useApprovedBrand, useBrandDetail, useDistrictBrand, useDeclinedBrand };