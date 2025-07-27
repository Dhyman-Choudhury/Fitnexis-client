import { Navigate, useLocation } from 'react-router'; // ✅ use react-router-dom
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole'; // ✅ correct import
import Loader from '../components/shared/Loader';

const MemberRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, isRoleLoading] = useUserRole(); // ✅ now returns array
    const location = useLocation();

    if (loading || isRoleLoading) {
        return <Loader />;
    }

    if (user && role === 'member') {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default MemberRoute;
