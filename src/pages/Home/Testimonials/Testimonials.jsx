import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import useAxios from '../../../hooks/useAxios';
import Loader from '../../../components/shared/Loader';

const Testimonials = () => {
    const axiosPublic = useAxios();
    const [currentIndex, setCurrentIndex] = useState(0);

    const { data: reviews = [], isLoading, isError, error } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('reviews');
            if (res.status !== 200) throw new Error('Failed to fetch reviews');
            return res.data;
        },
    });

    const ITEMS_PER_PAGE = 3;

    useEffect(() => {
        if (reviews.length <= ITEMS_PER_PAGE) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                (prev + ITEMS_PER_PAGE) % reviews.length
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [reviews]);

    if (isLoading) return <Loader />;
    if (isError) return <p className="text-center py-10 text-red-500">Error: {error.message}</p>;
    if (reviews.length === 0) return <p className="text-center py-10">No reviews available.</p>;

    const getVisibleReviews = () => {
        if (reviews.length <= ITEMS_PER_PAGE) return reviews;
        return reviews.slice(currentIndex, currentIndex + ITEMS_PER_PAGE).concat(
            currentIndex + ITEMS_PER_PAGE > reviews.length
                ? reviews.slice(0, (currentIndex + ITEMS_PER_PAGE) % reviews.length)
                : []
        );
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<FaStar key={i} className="text-yellow-400" size={20} />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" size={20} />);
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-300" size={20} />);
            }
        }

        return stars;
    };

    const visibleReviews = getVisibleReviews();

    return (
        <div className="bg-[#1c2c47] my-10 py-10 px-2 md:px-6 rounded-xl">
            <section className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Member <span className="text-sky-400">Reviews</span></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {visibleReviews.map((review, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform duration-500 hover:scale-105"
                        >
                            <p className="italic text-gray-700 mb-4">
                                <strong>Feedback:</strong> {review.feedback}
                            </p>
                            <img
                                src={review.userImage}
                                alt={review.userName}
                                className="w-16 h-16 rounded-full mb-2"
                            />
                            <p className="font-bold text-gray-800 mb-2"><strong>Name:</strong> {review.userName}</p>
                            <div className="flex justify-center">{renderStars(review.rating)}({review.rating})</div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={() =>
                            setCurrentIndex(
                                (currentIndex - ITEMS_PER_PAGE + reviews.length) % reviews.length
                            )
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() =>
                            setCurrentIndex(
                                (currentIndex + ITEMS_PER_PAGE) % reviews.length
                            )
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Next
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Testimonials;
