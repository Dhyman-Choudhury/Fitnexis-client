import React from 'react';
import logo from '../assets/logo/logo-3.webp'
import { Link } from 'react-router';

const FitnessLogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-end'>
                <img className='mb-2 w-16' src={logo} alt="" />
                <p className=' -ml-3 text-[32px] font-extrabold text-sky-300'>FitNexis</p>
            </div>
        </Link>
    );
};

export default FitnessLogo;