import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';


const UploadDrop = async ({
    name,
    description,
    badges_to_be_assigned,
    badges_filter,
    interests_filter,
    users_ids,
    token,
}) => {
    try {


        const formData = new FormData();

        formData.append('name', name);

        formData.append('description', description);

        badges_to_be_assigned?.forEach((badge) => {
            formData.append(`badges_to_be_assigned`, badge);
        });

        badges_filter?.forEach((badge) => {
            formData.append(`badges_filter`, badge);
        });

        interests_filter?.forEach((interest) => {
            formData.append(`interests_filter`, interest);
        });

        users_ids?.forEach((user) => {
            formData.append(`users_ids`, user);
        });

        const response = await axios.post(`/api/drop/`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;

    } catch (error) {

        throw new Error(error.message || 'Drop upload failed !');
    }
};


const useUploadDrop = () => {
    return useMutation({
        mutationFn: UploadDrop,
        mutationKey: ['postdrop'],
    })
};





export { useUploadDrop };