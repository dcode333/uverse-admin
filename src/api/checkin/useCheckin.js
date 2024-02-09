import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchAllCheckins = async ({ token }) => {
    try {
        const response = await axios.get(`/api/checkin/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {

        throw new Error(error.message || 'Fetch Checkins Failed');
    }
};

const fetchCheckin = async ({ token, checkinId }) => {
    try {

        const response = await axios.get(`/api/checkin/${checkinId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {
        throw new Error(error.message || 'Fetch Checkin Failed');
    }
};



const fetchCheckinTitle = async ({ token }) => {
    try {
        const response = await axios.get(`/api/checkin/`, {
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

const deleteCheckinItem = async ({ token, checkinId }) => {
    try {
        const response = await axios.delete(`/api/checkin/${checkinId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {
        throw new Error(error.message || 'Delete Checkin Failed');
    }
}


const UploadCheckin = async ({
    title,
    description,
    longitude,
    latitude,
    media,
    badgeId,
    category,
    giveaways_type,
    hashtags,
    required_tokens,
    expires_date,
    token,
}) => {


    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        hashtags.forEach((hashtag, index) => {
            formData.append(`hashtags[${index}]`, hashtag);
        });
        formData.append('type', 'checkin');
        formData.append('subtype', 'CHECKIN');
        formData.append('category', category);
        formData.append('longitude', longitude);
        formData.append('latitude', latitude);
        formData.append('media', media); // Assuming media is a File object
        formData.append('reward_badge', badgeId);
        formData.append('giveaways_type', giveaways_type);
        if (giveaways_type === 'Misc') formData.append('required_tokens', required_tokens);
        formData.append('expires_date', expires_date ? new Date(expires_date).toISOString() : '');


        const response = await axios.post(`/api/checkin/`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;

    } catch (error) {
        throw new Error(error?.response?.data?.reward_badge[0] || error.message || 'Checkin upload failed !');
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

const useCheckindetail = ({ token, checkinId }) => {
    return useQuery({
        queryKey: ['checkindetail', checkinId],
        queryFn: () => fetchCheckin({ token, checkinId }),
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

const useDeleteCheckinItem = () => {
    return useMutation({
        mutationFn: deleteCheckinItem,
        mutationKey: ['deletecheckinItem'],
    })
}

export { useCheckin, useUploadCheckin, useCheckinTitle, useCheckindetail, useDeleteCheckinItem };
