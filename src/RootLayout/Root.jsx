import React from 'react';
import { Outlet } from 'react-router';
import CustomNavbar from '../components/Header/CustomNavbar';

const Root = () => {
    return (
        <div>
            <CustomNavbar></CustomNavbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;