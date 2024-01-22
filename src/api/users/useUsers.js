import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUsers = async ({ token }) => {
    try {
        const response = await axios.get(`/api/get-all-users/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Fetch Users Failed');
    }
};

const fetchUsersTitle = async ({ token }) => {
    try {
        const response = await axios.get(`/api/get-all-users/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response.data?.results?.filter(({ id, username }) => id && username).map(({ id, username }) => ({ id, label: username }));
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Fetch Users Failed');
    }
}

const fetchUserProfile = async ({ token, userId }) => {
    try {
        const response = await axios.get(`/api/getuserprofile/${userId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Fetch User Profile Failed');
    }
};

const useUserProfile = ({ token, userId }) => {
    return useQuery({
        queryKey: ['userprofile', userId],
        queryFn: () => fetchUserProfile({ token, userId }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
};


const useUsers = (token) => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => fetchUsers({ token }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
};

const useUsersTitle = ({ token }) => {
    return useQuery({
        queryKey: ['userstitle'],
        queryFn: () => fetchUsersTitle({ token }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
}

export { useUsers, useUserProfile, useUsersTitle };
