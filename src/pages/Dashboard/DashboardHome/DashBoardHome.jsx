import React from 'react';
import Loader from '../../../components/shared/Loader';
import Forbidden from '../../Forbidden/Forbidden';
import useUserRole from '../../../hooks/useUserRole';
import TrainerDashBoard from './TrainerDashBoard';
import MemberDashBoard from './MemberDashBoard';
import AdminDashBoard from './AdminDashBoard';


const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Loader></Loader>
    }

    if(role === 'member'){
        return <MemberDashBoard></MemberDashBoard>
    }
    else if(role === 'trainer'){
        return <TrainerDashBoard></TrainerDashBoard>
    }
    else if(role ==='admin'){
        return <AdminDashBoard></AdminDashBoard>
    }
    else {
        return <Forbidden></Forbidden>
    }

};

export default DashboardHome;