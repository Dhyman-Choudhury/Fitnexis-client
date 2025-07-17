import { Button } from 'flowbite-react';
import React from 'react';
import Test from './Text';
import Banner from '../../components/Banner/Banner';
import FeaturedSection from './FeaturedSection/FeaturedSection';
import About from './About/About';
import Newsletter from './Newsletter/Newsletter';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <About></About>
            <Newsletter></Newsletter>
            <Test></Test>
        </div>
    );
};

export default Home;