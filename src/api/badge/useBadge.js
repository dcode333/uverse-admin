import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchBadgeTitle = async ({ token }) => {
    try {
        const response = await axios.get(`/api/badge/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data?.results.map(({ id, title }) => ({ id, label: title }));

    } catch (error) {
        console.log(error.message)
        throw new Error(error.message || 'Fetch Badges title Failed');
    }
};



const fetchAllBadges = async ({ token }) => {
    try {
        const response = await axios.get(`/api/badge/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {
        throw new Error(error.message || 'Fetch Badges Failed');
    }
};

const UploadBadge = async ({
    title,
    description,
    media,
    checkin,
    token,
    badges_type,
    hashtag,
    age_restricted,
    additional_information,
    quantity,
    constraint_number,
    required_tokens
}) => {
    try {

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('type', 'badge');
        formData.append('subtype', 'BADGE');
        formData.append('media', media); // Assuming media is a File object
        formData.append('checkIn', checkin ? checkin : '');
        formData.append('badges_type', badges_type);
        formData.append('hashtag', hashtag);
        formData.append('age_restricted', age_restricted);
        formData.append('additional_information', additional_information);
        if (badges_type === 'Misc') {
            formData.append('quantity', quantity);
            formData.append('required_tokens', required_tokens);
        }
        if (badges_type === 'Follower' || badges_type === 'Followings' || badges_type === 'Creations')
            formData.append('constraint_number', constraint_number);


        const response = await axios.post(`/api/badge/`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;

    } catch (error) {

        throw new Error(error?.response?.data?.checkIn[0] || error.message || 'Badge upload failed !');
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

const useUploadBadge = () => {
    return useMutation({
        mutationFn: UploadBadge,
        mutationKey: ['postbadge'],
    })
};



const useBadges = (token) => {
    return useQuery({
        queryKey: ['badges'],
        queryFn: () => fetchAllBadges({ token }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
};

export { useBadgeTitle, useBadges, useUploadBadge };
