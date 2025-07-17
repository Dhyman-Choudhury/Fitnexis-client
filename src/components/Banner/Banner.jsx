import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

import banner1 from '../../assets/Banner/Banner-1.webp';
import banner2 from '../../assets/Banner/Banner-2.jpg';
import banner3 from '../../assets/Banner/Banner-3.jpg';

const images = [banner1, banner2, banner3];

const titles = [
    <>
        Achieve Your Best <span className="text-sky-400">Shape</span> with FitNexis
    </>,
    <>
        Embrace the <span className="text-sky-400">Run</span> in Nature with FitNexis
    </>,
    <>
        Train with Certified <span className="text-sky-400">Experts</span> at FitNexis
    </>,
];

const descriptions = [
    "Book certified fitness instructors and explore custom training sessions crafted just for you.",
    "Get moving with nature-inspired workouts designed to energize your mind and body.",
    "Experience hands-on guidance from professional trainers committed to your fitness goals.",
];

const Banner = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full h-[90vh] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 transition-all duration-1000">
                <img
                    src={images[index]}
                    alt="Fitness Banner"
                    className="w-full h-full object-cover transition-opacity duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
                <div className="max-w-3xl">
                    {/* Title Motion */}
                    <motion.h1
                        key={index}
                        className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {titles[index]}
                    </motion.h1>

                    {/* Description Motion */}
                    <motion.p
                        className="text-lg md:text-xl text-gray-200 mb-8"
                        key={`desc-${index}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        {descriptions[index]}
                    </motion.p>

                    {/* Button Motion */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <Link to="/classes">
                            <button className="px-8 py-3 bg-gradient-to-r from-green-400 to-teal-500 hover:from-teal-500 hover:to-green-400 text-white font-semibold rounded-full shadow-lg transition-all duration-300">
                                Explore Classes
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
