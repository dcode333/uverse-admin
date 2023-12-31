import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const fetchLogin = async ({ email, password }) => {
    try {
        const response = await axios.post('/api/login/', { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

const useLogin = () => {
    return useMutation({
        mutationKey: ['admin'],
        mutationFn: fetchLogin,
    })
};

export { useLogin };
