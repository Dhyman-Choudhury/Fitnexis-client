import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Rating from 'react-rating';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const ReviewModal = ({ trainer, users, onClose }) => {
    const { register, handleSubmit, setValue, reset } = useForm();
    const [rating, setRating] = useState(0);
    const axiosSecure = useAxiosSecure();
    
    const onSubmit = async (data) => {
        const review = {
            ...data,
            rating,
            trainerId: trainer?.trainerId,
            trainerName: trainer?.name,
            userName: users?.user?.name,
            userImage: users?.user?.photo,
            date: new Date(),
        };
       console.log('Submitting Review:', review);

        try {
            await axiosSecure.post('/reviews', review);
            toast.success('Review submitted successfully');
            reset();
            setRating(0);
            onClose();
        } catch (err) {
            toast.error('Failed to submit review');
        }
    };

    const handleRatingChange = (value) => {
        setRating(value);
        setValue('rating', value); // Sync with react-hook-form
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <ToastContainer />
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Leave a Review for {trainer.name}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Feedback Field */}
                    <textarea
                        {...register('feedback', { required: true })}
                        className="w-full p-2 border rounded mb-4"
                        placeholder="Your feedback"
                    />

                    {/* Star Rating Field */}
                    <div className="mb-4 text-center">
                        <Rating
                            fractions={2}
                            initialRating={rating}
                            onChange={handleRatingChange}
                            emptySymbol={<FaRegStar className="text-2xl text-gray-400" />}
                            fullSymbol={<FaStar className="text-2xl text-yellow-400" />}
                            placeholderRating={rating}
                            placeholderSymbol={<FaStarHalfAlt className="text-2xl text-yellow-300" />}
                        />

                        <p className="mt-2 text-sm text-gray-500">Rating: {rating}</p>
                    </div>

                    {/* Hidden rating field for form submission */}
                    <input type="hidden" {...register('rating', { required: true })} value={rating} />

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                            disabled={rating === 0}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
