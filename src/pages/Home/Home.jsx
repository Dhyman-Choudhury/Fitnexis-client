import { Button } from 'flowbite-react';
import React, { useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import FeaturedSection from './FeaturedSection/FeaturedSection';
import About from './About/About';
import Newsletter from './Newsletter/Newsletter';
import { ToastContainer } from 'react-toastify';
import FeaturedClasses from './FeaturedClasses/FeaturedClasses';

const Home = () => {
    useEffect(()=>{
        document.title = 'Home | FitNexis'
    },[])
    return (
        
        <div>
            <ToastContainer/>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <About></About>
            <FeaturedClasses></FeaturedClasses>
            <Newsletter></Newsletter>
            
        </div>
    );
};

export default Home;