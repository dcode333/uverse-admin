import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const deleteDropItem = async ({ token, dropId }) => {
    try {
        const response = await axios.delete(`/api/drop/${dropId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {

        throw new Error(error.message || 'Delete Drop Failed');
    }

};

const useDeleteDropItem = () => {
    return useMutation({
        mutationFn: deleteDropItem,
        mutationKey: ['deletedropItem'],
    })
}


export { useDeleteDropItem };