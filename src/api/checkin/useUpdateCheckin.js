import { useMutation } from '@tanstack/react-query';
import axios from 'axios';


const UpdateCheckin = async ({
    title,
    description,
    media,
    hashtags,
    checkinId,
    token
}) => {
    try {

        if (!title && !description && !media)
            throw new Error('Nothing seems to be updated !');

        const formData = new FormData();
        if (title) formData.append('title', title);
        if (media) formData.append('media', media);
        if (description) {

            formData.append('description', description);
            hashtags.forEach((hashtag, index) => {
                formData.append(`hashtags`, hashtag);
            });
        }

        const response = await axios.put(`/api/checkin/${checkinId}/`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;

    } catch (error) {
        throw new Error(error.message || 'Checkin update failed !');
    }
};


const useUpdateCheckin = () => {
    return useMutation({
        mutationFn: UpdateCheckin,
        mutationKey: ['updatecheckin'],
    })
};





export { useUpdateCheckin };
