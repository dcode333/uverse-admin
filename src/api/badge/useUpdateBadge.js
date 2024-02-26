import { useMutation } from '@tanstack/react-query';
import axios from 'axios';


const UpdateBadge = async ({
    title,
    description,
    media,
    additional_information,
    hashtags,
    badgeId,
    giveaways_type,
    quantity,
    constraint_number,
    required_tokens,
    expires_date,
    token
}) => {
    try {


        if (!title && !description && !additional_information &&
            !media && !giveaways_type && !quantity && !constraint_number &&
            !required_tokens && !expires_date) throw new Error('Nothing seems to be updated !');

        const formData = new FormData();
        if (title) formData.append('title', title);
        if (media) formData.append('media', media);
        if (additional_information) formData.append('additional_information', additional_information);
        if (giveaways_type) formData.append('giveaways_type', giveaways_type);
        if (expires_date) formData.append('expires_date', expires_date);
        if (quantity || (giveaways_type !== 'Misc' && giveaways_type !== "")) formData.append('quantity', quantity);
        if (required_tokens || (giveaways_type !== 'Misc' && giveaways_type !== "")) formData.append('required_tokens', required_tokens);
        if (constraint_number || (giveaways_type !== 'Follower' && giveaways_type !== "Follower" && giveaways_type !== "Creations" && giveaways_type !== ""))
            formData.append('constraint_number', constraint_number);



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
