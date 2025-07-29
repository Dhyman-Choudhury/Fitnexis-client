import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import {
    AiOutlineHome,
    AiOutlineUser,
    AiOutlineSetting,
    AiOutlineMenu,
    AiOutlineClose,
    AiOutlineUserAdd,
    AiOutlineMail,
    AiOutlineFileSearch,
    AiOutlineTeam,
    AiOutlinePlus,
    AiOutlineHistory,
    AiOutlinePlusCircle,
    AiOutlineUserSwitch,
} from 'react-icons/ai';
import { MdAddToPhotos, MdManageAccounts } from 'react-icons/md';
import { FaMoneyBillWave } from "react-icons/fa";
import FitnessLogo from '../components/FitnessLogo';
import useUserRole from '../hooks/useUserRole';

const DashboardLayout = () => {
    useEffect(() => {
        document.title = 'Dashboard | FitNexis'
    }, [])
    const {role, roleLoading } = useUserRole()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const linkClasses = ({ isActive }) =>
        isActive
            ? 'flex items-center gap-2 px-4 py-2 rounded bg-blue-400 text-white'
            : 'flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200';

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Mobile Toggle Button */}
            <div className="bg-gray-900 text-white p-4 flex justify-between items-center md:hidden">
                <FitnessLogo />
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-white text-2xl"
                >
                    {isSidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`bg-gray-900 text-white p-6 space-y-6 w-64 md:block ${isSidebarOpen ? 'block' : 'hidden'
                    } md:relative absolute z-50 h-screen md:h-auto`}
            >
                <FitnessLogo />
                <nav className="flex flex-col space-y-2">
                    <NavLink to="/dashboard" end className={linkClasses}>
                        <AiOutlineHome size={20} />
                        Dashboard Home
                    </NavLink>

                    {/* Admin */}
                    {!roleLoading && role === 'admin' && <>
                    <NavLink to="/dashboard/allTrainersD" className={linkClasses}>
                        <AiOutlineTeam size={20} />
                        All Trainers
                    </NavLink>
                    <NavLink to="/dashboard/makeAdmin" className={linkClasses}>
                        <AiOutlineUserAdd size={20} />
                        Make Admin
                    </NavLink>

                    <NavLink to="/dashboard/adminNewsletter" className={linkClasses}>
                        <AiOutlineMail size={20} />
                        Admin Newsletter
                    </NavLink>

                    <NavLink to="/dashboard/appliedTrainers" className={linkClasses}>
                        <AiOutlineFileSearch size={20} />
                        Applied Trainers
                    </NavLink>
                    <NavLink to="/dashboard/adminBalance" className={linkClasses}>
                        <FaMoneyBillWave size={20} />
                        Admin Balance
                    </NavLink>
                    <NavLink to="/dashboard/adminAddClass" className={linkClasses}>
                        <AiOutlinePlus size={20} />
                        Add Class
                    </NavLink>
                    <NavLink to="/dashboard/addForum" className={linkClasses}>
                        <AiOutlinePlusCircle size={20} />
                        Add New Forum
                    </NavLink>
                    </>}

                    {/* Trainer */}
                    {!roleLoading && role === 'trainer' && <>
                    <NavLink to="/dashboard/trainerAddSlot" className={linkClasses}>
                        <MdAddToPhotos size={20} />
                        Trainer Add Slot
                    </NavLink>
                    <NavLink to="/dashboard/trainerManageSlots" className={linkClasses}>
                        <MdManageAccounts size={20} />
                        Manage Slots
                    </NavLink>
                    <NavLink to="/dashboard/addForum" className={linkClasses}>
                        <AiOutlinePlusCircle size={20} />
                        Add New Forum
                    </NavLink>
                    </>}

                    {/* Member */}
                    {!roleLoading && role === 'member' && <>
                    <NavLink to="/dashboard/profile" className={linkClasses}>
                        <AiOutlineUser size={20} />
                        Profile
                    </NavLink>

                    <NavLink to="/dashboard/activityLog" className={linkClasses}>
                        <AiOutlineHistory size={20} />
                        Activity Log
                    </NavLink>
                    <NavLink to="/dashboard/bookedTrainer" className={linkClasses}>
                        <AiOutlineUserSwitch size={20} />
                        Booked Trainer
                    </NavLink>
                    </>}





                </nav>
            </aside>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
