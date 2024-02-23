
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';


const UpdateLibrary = async ({
    title,
    description,
    media,
    hashtags,
    libraryId,
    token,
    width,
    length
}) => {
    try {

        if (!title && !description && !media)
            throw new Error('Nothing seems to be updated !');

        const formData = new FormData();
        if (title) formData.append('title', title);
        if (media) {
            formData.append('media', media);
            formData.append('width', width);
            formData.append('length', length);
        }
        if (description) {

            formData.append('description', description);
            hashtags.forEach((hashtag, index) => {
                formData.append(`hashtags`, hashtag);
            });
        }

        const response = await axios.put(`/api/library/${libraryId}/`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;

    } catch (error) {
        throw new Error(error.message || 'Library update failed !');
    }
};


const useUpdateLibrary = () => {
    return useMutation({
        mutationFn: UpdateLibrary,
        mutationKey: ['updatelibrary'],
    })
};





export { useUpdateLibrary };
