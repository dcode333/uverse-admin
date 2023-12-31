import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchAllCheckins = async ({ token }) => {
    try {
        const response = await axios.get(`/api/checkins/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {

        throw new Error(error.message || 'Fetch Checkins Failed');
    }
};

const fetchCheckinTitle = async ({ token }) => {
    try {
        const response = await axios.get(`/api/checkins/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const uniqueTitles = new Set();
        const uniqueCheckinTitles = [];

        (response.data?.results || []).forEach(({ id, title }) => {
            if (!uniqueTitles.has(title)) {
                uniqueTitles.add(title);
                uniqueCheckinTitles.push({ id, label: title });
            }
        });

        return uniqueCheckinTitles;

    } catch (error) {
        console.log(error.message)
        throw new Error(error.message || 'Fetch Checkin title Failed');
    }
};



const UploadCheckin = async ({
    title,
    description,
    longitude,
    latitude,
    media,
    badgeId,
    token,
}) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('type', 'checkin');
        formData.append('subtype', 'CHECKIN');
        formData.append('longitude', longitude);
        formData.append('latitude', latitude);
        formData.append('media', media); // Assuming media is a File object
        formData.append('reward_badge', badgeId);

        const response = await axios.post(`/api/checkins/`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;

    } catch (error) {
        throw new Error('Checkin upload failed !');
    }
};

const useCheckinTitle = (token) => {
    return useQuery({
        queryKey: ['checkintitle'],
        queryFn: () => fetchCheckinTitle({ token }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
};


const useCheckin = (token) => {
    return useQuery({
        queryKey: ['checkins'],
        queryFn: () => fetchAllCheckins({ token }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
};

const useUploadCheckin = () => {
    return useMutation({
        mutationFn: UploadCheckin,
        mutationKey: ['postcheckin'],
    })
};

export { useCheckin, useUploadCheckin, useCheckinTitle };
