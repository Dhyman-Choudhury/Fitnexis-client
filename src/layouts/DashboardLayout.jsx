import React from 'react';
import { NavLink, Outlet } from 'react-router';
import {
    AiOutlineHome,
    AiOutlineUser,
    AiOutlineSetting
} from 'react-icons/ai';
import FitnessLogo from '../components/FitnessLogo';

const DashboardLayout = () => {
    const linkClasses = ({ isActive }) =>
        isActive
            ? 'flex items-center gap-2 px-4 py-2 rounded bg-blue-400 text-white'
            : 'flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200';

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
                <FitnessLogo></FitnessLogo>
                <nav className="flex flex-col space-y-2">
                    <NavLink to="/dashboard" end className={linkClasses}>
                        <AiOutlineHome size={20} />
                        Dashboard Home
                    </NavLink>
                    <NavLink to="/dashboard/profile" className={linkClasses}>
                        <AiOutlineUser size={20} />
                        Profile
                    </NavLink>
                    <NavLink to="/dashboard/settings" className={linkClasses}>
                        <AiOutlineSetting size={20} />
                        Settings
                    </NavLink>
                    {/* Add more links with icons here */}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
