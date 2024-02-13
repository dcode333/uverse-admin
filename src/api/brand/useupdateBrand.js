import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const brandApproval = async ({ token, brandId, status }) => {
    try {
        const response = await axios.put(`/api/approve-decline-brand/${brandId}/?status=${status}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {

        throw new Error(error.message || 'Put Brand approval failed');
    }
};



const useApproveBrand = () => {
    return useMutation({
        mutationFn: brandApproval,
        mutationKey: ['approveBrand'],
    })
};






export { useApproveBrand };