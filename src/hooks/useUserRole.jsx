import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role = '', isLoading: roleLoading } = useQuery({
        enabled: !authLoading && !!user?.email,
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/users/role?email=${user.email}`);
            return res?.data?.role; // Example: 'admin' | 'trainer' | 'member'
        },
    });
    console.log(role)
    return { role, roleLoading: authLoading || roleLoading };
};

export default useUserRole;
