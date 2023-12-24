import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const fetchSignIn = async ({ email, password, number }) => {
    try {
        const response = await axios.post('/api/signup/', { email, password, number });
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.response?.data?.message || 'Sign In failed');
    }
};

const useRegister = () => {
    return useMutation({
        mutationKey: ['admin'],
        mutationFn: fetchSignIn,
    })
};

export { useRegister };
