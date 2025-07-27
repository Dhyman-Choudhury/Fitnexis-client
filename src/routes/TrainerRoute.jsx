import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Loader from '../components/shared/Loader';

const TrainerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, isRoleLoading] = useUserRole();
    const location = useLocation();

    if (loading || isRoleLoading) {
        return <Loader />;
    }

    if (user && role === 'trainer') {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default TrainerRoute;
