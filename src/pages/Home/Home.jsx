import { Button } from 'flowbite-react';
import React, { useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import FeaturedSection from './FeaturedSection/FeaturedSection';
import About from './About/About';
import { ToastContainer } from 'react-toastify';
import FeaturedClasses from './FeaturedClasses/FeaturedClasses';
import Testimonials from './Testimonials/Testimonials';
import Newsletter from './Newsletter/Newsletter';
import TrainerTeamSection from './TrainerTeamSection/TrainerTeamSection';

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
            <Testimonials></Testimonials>
           <Newsletter></Newsletter>
           <TrainerTeamSection></TrainerTeamSection>
            
        </div>
    );
};

export default Home;