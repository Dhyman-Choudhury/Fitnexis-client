import { Navigate } from 'react-router'; // ✅ use react-router-dom
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole'; // ✅ correct import
import Loader from '../components/shared/Loader';

const MemberRoute = ({ children }) => {
   const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Loader/>
    }

    if (!user || role !== 'member') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};
export default MemberRoute;
