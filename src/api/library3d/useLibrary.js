import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';


const fetchAllLibraries = async ({ token }) => {
    try {
        const response = await axios.get(`/api/library/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {
        throw new Error(error.message || 'Fetch Badges Failed');
    }
};

const deleteLibraryItem = async ({ token, libraryId }) => {

    try {
        const response = await axios.delete(`/api/library/${libraryId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {
        throw new Error(error.message || 'Delete Library Failed');
    }
};


const LibraryDetail = async ({ token, libraryId }) => {

    try {
        const response = await axios.get(`/api/library/${libraryId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {
        throw new Error(error.message || 'Library detail Failed');
    }
};


const UploadLibrary = async ({
    title,
    description,
    media,
    locked_content,
    hashtags,
    is_locked,
    subtype,
    category,
    subcategory,
    token,
    threeD_file,
    width,
    length
}) => {
    try {

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('media', media);
        if (is_locked) formData.append('locked_content', locked_content);
        hashtags.forEach((hashtag, index) => {
            formData.append(`hashtags[${index}]`, hashtag);
        });
        formData.append('is_locked', is_locked);
        formData.append('subtype', subtype);
        formData.append('category', category);
        formData.append('subcategory', subcategory);
        formData.append('threeD_file', threeD_file);
        formData.append('width', width);
        formData.append('length', length);


        const response = await axios.post(`/api/library/`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;

    } catch (error) {
        throw new Error('Library upload failed !');
    }
};


const useUploadLibrary = () => {
    return useMutation({
        mutationFn: UploadLibrary,
        mutationKey: ['postlibrary'],
    })
};

const useLibrary = ({ token, libraryId }) => {
    return useQuery({
        queryKey: ['librarydetail', libraryId],
        queryFn: () => LibraryDetail({ token, libraryId }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
};


const useLibraries = (token) => {
    return useQuery({
        queryKey: ['libraries'],
        queryFn: () => fetchAllLibraries({ token }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
};

const useDeleteLibraryItem = () => {
    return useMutation({
        mutationFn: deleteLibraryItem,
        mutationKey: ['deletelibraryItem'],
    })
}


export { useLibraries, useUploadLibrary, useDeleteLibraryItem, useLibrary };
