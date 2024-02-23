import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';


const UpdateDistrict = async ({
    title,
    description,
    media,
    token,
    districtId
}) => {
    try {

        if (!title && !description && !media)
            throw new Error('Nothing seems to be updated !');

        const formData = new FormData();

        if (title) formData.append('title', title);

        if (description) formData.append('description', description);

        if (media)
            media?.forEach((mediaItem) => {
                formData.append(`media`, mediaItem);
            });

        const response = await axios.put(`/api/district/${districtId}/`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;

    } catch (error) {

        throw new Error(error.message || 'District update failed !');
    }
};



const useUpdateDistrict = () => {
    return useMutation({
        mutationFn: UpdateDistrict,
        mutationKey: ['updatedistrict'],
    })
};



export { useUpdateDistrict };