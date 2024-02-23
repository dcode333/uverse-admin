import { useMutation } from '@tanstack/react-query';
import axios from 'axios';


const UpdateBadge = async ({
    title,
    description,
    media,
    additional_information,
    hashtags,
    badgeId,
    token
}) => {
    try {

        if (!title && !description && !additional_information && !media)
            throw new Error('Nothing seems to be updated !');

        const formData = new FormData();
        if (title) formData.append('title', title);
        if (media) formData.append('media', media);
        if (additional_information) formData.append('additional_information', additional_information);
        if (description) {

            formData.append('description', description);
            hashtags.forEach((hashtag, index) => {
                formData.append(`hashtags`, hashtag);
            });
        }

        const response = await axios.put(`/api/badge/${badgeId}/`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;

    } catch (error) {
        throw new Error(error.message || 'Badge update failed !');
    }
};


const useUpdateBadge = () => {
    return useMutation({
        mutationFn: UpdateBadge,
        mutationKey: ['updatebadge'],
    })
};





export { useUpdateBadge };
