import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';


const UploadDistrict = async ({
    title,
    description,
    media,
    brands,
    token,
}) => {
    try {

        const formData = new FormData();

        formData.append('title', title);

        formData.append('description', description);

        media?.forEach((mediaItem) => {
            formData.append(`media`, mediaItem);
        });

        brands?.forEach((brandItem) => {
            formData.append(`brands`, brandItem);
        });


        const response = await axios.post(`/api/district/`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;

    } catch (error) {

        throw new Error(error.message || 'District upload failed !');
    }
};


const addBrandToDistrict = async ({
    brands,
    districtId,
    token
}) => {
    try {

        const formData = new FormData();

        brands?.forEach((brandItem) => {
            formData.append(`brands`, brandItem);
        });

        
        const response = await axios.patch(`/api/district/${districtId}/`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;

    } catch (error) {
        console.log(error)
        throw new Error(error.message || 'Add Brand to district failed !');
    }
};


const useUploadDistrict = () => {
    return useMutation({
        mutationFn: UploadDistrict,
        mutationKey: ['postdistrict'],
    })
};

const useAddBrandToDistrict = () => {
    return useMutation({
        mutationFn: addBrandToDistrict,
        mutationKey: ['addbrandtodistrict'],
    })
}


export { useUploadDistrict, useAddBrandToDistrict };