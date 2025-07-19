import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaStar } from 'react-icons/fa';
import useAxios from '../../../hooks/useAxios';
import Loader from '../../../components/shared/Loader';

const Testimonials = () => {
    const axiosPublic = useAxios();
    const [currentIndex, setCurrentIndex] = useState(0);

    const { data: reviews = [], isLoading, isError, error } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/reviews');
            if (res.status !== 200) throw new Error('Failed to fetch reviews');
            return res.data;
        },
    });

    // Auto-slide every 5 seconds
    useEffect(() => {
        if (reviews.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [reviews]);

    if (isLoading) return <Loader />;
    if (isError)
        return (
            <p className="text-center py-10 text-red-500">
                Error: {error.message}
            </p>
        );

    if (reviews.length === 0)
        return <p className="text-center py-10">No reviews available.</p>;

    const { name, message, rating } = reviews[currentIndex];

    return (
        <section className="my-12 px-4 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Member Reviews</h2>

            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
                <p className="italic text-gray-700 mb-6">"{message}"</p>
                <div className="flex items-center justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
                            size={24}
                        />
                    ))}
                </div>
                <h4 className="font-semibold text-lg">{name}</h4>

                {/* Navigation buttons */}
                <div className="mt-6 flex justify-center gap-4">
                    <button
                        onClick={() =>
                            setCurrentIndex(
                                (currentIndex - 1 + reviews.length) % reviews.length
                            )
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() =>
                            setCurrentIndex((currentIndex + 1) % reviews.length)
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
