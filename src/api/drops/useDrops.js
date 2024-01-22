
///api/allinterest/
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchInterests = async ({ token }) => {
    try {
        const response = await axios.get(`/api/allinterest/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data?.map(({ id, name }) => ({ id, label: name }));

    } catch (error) {
        console.log(error.message)
        throw new Error(error.message || 'Fetch Interests Failed');
    }
};

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
        badges_to_be_assigned?.forEach((badge, index) => {
            formData.append(`badges_to_be_assigned[${index}]`, badge);
        });
        badges_filter?.forEach((badge, index) => {
            formData.append(`badges_filter[${index}]`, badge);
        });
        interests_filter?.forEach((interest, index) => {
            formData.append(`interests_filter[${index}]`, interest);
        });
        users_ids?.forEach((user, index) => {
            formData.append(`users_ids[${index}]`, user);
        });


        const response = await axios.post(`/api/drop/`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;

    } catch (error) {
        console.log(error)
        throw new Error(error.message || 'Drop upload failed !');
    }
};


const useUploadDrop = () => {
    return useMutation({
        mutationFn: UploadDrop,
        mutationKey: ['postdrop'],
    })
};



const useInterests = ({ token }) => {
    return useQuery({
        queryKey: ['interests'],
        queryFn: () => fetchInterests({ token }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
}


export { useInterests, useUploadDrop };