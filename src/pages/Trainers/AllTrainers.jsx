import React, { useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import Loader from '../../components/shared/Loader';
import useAxios from '../../hooks/useAxios';
import { motion } from 'framer-motion';

const AllTrainers = () => {
    useEffect(() => {
        document.title = 'AllTrainer | FitNexis';
    }, []);

    const axiosPublic = useAxios();

    const { data: trainers = [], isLoading, isError } = useQuery({
        queryKey: ['latestForums'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/trainers');
            if (res.status !== 200) throw new Error('Failed to fetch trainers');
            return res.data;
        },
    });

    if (isLoading) return <Loader />;
    if (isError) return <p className="text-red-500">Error loading trainers.</p>;

    return (
        <div className="container mx-auto p-4 my-0.5 rounded-xl">
            <h1 className="text-3xl text-white font-bold mb-6">All Trainers</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trainers?.map((trainer, i) => (
                    <motion.div
                        key={trainer._id}
                        className="border bg-gray-400 rounded-xl border-gray-300 p-4 shadow-2xla"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        {/* Trainer Image */}
                        <motion.img
                            src={trainer?.profileImage}
                            alt={trainer?.name}
                            className="rounded-xl mx-auto mb-4"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        />

                        {/* Trainer Info */}
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-xl font-semibold">Name: {trainer.name}</h2>
                            <p className="text-gray-800">Experience: {trainer.experience}</p>

                            {/* Social Icons */}
                            <div className="flex gap-4 text-2xl mt-2">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white rounded-full text-[#1877F2] hover:scale-110 transition"
                                >
                                    <FaFacebookF />
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#E1306C] hover:scale-110 transition"
                                >
                                    <FaInstagram />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black hover:scale-110 transition"
                                >
                                    <FaXTwitter />
                                </a>
                            </div>

                            {/* Available Days */}
                            <p className="text-green-800 text-lg flex gap-2 mt-2">
                                <span className="text-gray-800">Available Days:</span>
                                {trainer?.availableDays?.map((day, index) => (
                                    <span key={index}>{day}</span>
                                ))}
                            </p>

                            {/* ✅ Available Slots from trainer.availableSlots */}
                            <div className="mt-2">
                                <h3 className="text-gray-900 font-semibold mb-1">Available Slots:</h3>
                                {trainer?.availableSlots?.filter(slot => !slot.isBooked).length > 0 ? (
                                    <div className="flex gap-2 flex-wrap">
                                        {trainer?.availableSlots
                                            ?.filter(slot => !slot.isBooked)
                                            .map(slot => (
                                                <span
                                                    key={slot._id}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    {slot?.slotName} ({slot?.slotTime})
                                                </span>
                                            ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-700">No available slots.</p> // ✅ fallback message
                                )}

                            </div>

                            {/* View Details */}
                            <Link to={`/trainers/${trainer._id}`} className="mt-4 inline-block btn-primary">
                                View Details
                            </Link>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AllTrainers;
