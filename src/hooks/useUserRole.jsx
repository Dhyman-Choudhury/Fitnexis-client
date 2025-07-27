import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role = '', isLoading: roleLoading } = useQuery({
        enabled: !!user?.email,
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/users/role/${user.email}`);
            return res.data?.role; // Expecting: { role: 'member' }
        },
    });

    return [role, authLoading || roleLoading];
};

export default useUserRole;
