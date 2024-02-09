import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const fetchCategories = async ({ token }) => {
    try {
        const response = await axios.get(`/api/category/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data?.results.map(({ id, title }) => ({ id, label: title }));
    } catch (error) {

        throw new Error(error.message || 'Fetch Categories Failed');
    }
};



const useCategories = ({ token }) => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories({ token }),
        staleTime: Infinity,
        refetchOnMount: false,
    })
}






export { useCategories };