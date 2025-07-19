import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import useAuth from './useAuth';

const useRole = () => {
    const axiosSecure = useAxios();
    const { user } = useAuth();

    const { data: role, isLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user?.email}`);
            return res.data.role;
        }
    });

    return { role, isLoading };
};

export default useRole;
