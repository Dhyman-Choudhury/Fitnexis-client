import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../../components/shared/Loader';


const TrainerBooking = () => {
    const { trainerId, slotId } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [selectedPackage, setSelectedPackage] = useState('');

    // Fetch slot info
    const { data: slot, isLoading, isError } = useQuery({
        queryKey: ['slotDetails', slotId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/trainers/${trainerId}/slots/${slotId}`);
            return res.data;
        },
    });

    // Handle "Join Now"
    const handleJoinNow = () => {
        if (!selectedPackage) {
            toast.error('Please select a membership package.');
            return;
        }

        // Redirect to payment page with package selected
        navigate(`/dashboard/payment/${slotId}?package=${selectedPackage}`);
    }

    if (isLoading) return <Loader />;
    if (isError) return <p className="text-red-500">Failed to load slot information.</p>;

    return (
        <div className="container mx-auto p-6 rounded-lg my-0.5">
            <ToastContainer />
            <h2 className="text-4xl font-bold mb-6 text-white">Book Trainer Slot</h2>
            <div className="mb-4">
                <p className='text-gray-200'>
                    {slot?.trainers?.map(trainer => <>
                        <strong>Trainer Name:</strong> {trainer?.name || 'N/A'}
                    </>)}
                </p>
                <p className='text-gray-200'>
                    <strong>Slot:</strong> {slot?.slotName || 'N/A'}
                </p>
                <p className='text-gray-200'>
                    <strong>Time:</strong> {slot?.slotTime || 'N/A'}
                </p>
                <p className='text-gray-200'>
                    <strong>Class:</strong> {slot?.class_name || 'N/A'}
                </p>
            </div>

            <h3 className="text-2xl font-semibold mb-2 text-white">Select a Membership Package</h3>

            <div className="grid md:grid-cols-3 gap-4 text-black">
                {/* Basic */}
                <div className={`p-5 rounded shadow ${selectedPackage === 'basic' ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                    <h4 className="text-xl font-bold mb-2">Basic Membership</h4>
                    <ul className="list-disc ml-5 text-sm">
                        <li>Access to gym facilities during regular hours</li>
                        <li>Use of cardio and strength equipment</li>
                        <li>Access to locker rooms and showers.</li>
                    </ul>
                    <p className="mt-3 font-semibold">Price: $10</p>
                    <button onClick={() => setSelectedPackage('basic')} className="btn-primary mt-2">Select</button>
                </div>

                {/* Standard */}
                <div className={`p-5 rounded shadow ${selectedPackage === 'standard' ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                    <h4 className="text-xl font-bold mb-2">Standard Membership</h4>
                    <ul className="list-disc ml-5 text-sm">
                        <li>All Basic benefits</li>
                        <li>Access to group fitness classes</li>
                        <li>Use of locker rooms & showers</li>
                    </ul>
                    <p className="mt-3 font-semibold">Price: $50</p>
                    <button onClick={() => setSelectedPackage('standard')} className="btn-primary mt-2">Select</button>
                </div>

                {/* Premium */}
                <div className={`p-5 rounded shadow ${selectedPackage === 'premium' ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                    <h4 className="text-xl font-bold mb-2">Premium Membership</h4>
                    <ul className="list-disc ml-5 text-sm">
                        <li>All Standard benefits</li>
                        <li>Personal trainer access</li>
                        <li>Sauna, massage, nutrition discounts</li>
                    </ul>
                    <p className="mt-3 font-semibold">Price: $100</p>
                    <button onClick={() => setSelectedPackage('premium')} className="btn-primary mt-2">Select</button>
                </div>
            </div>

            <div className="mt-6">
                <button onClick={handleJoinNow} className="btn btn-primary w-full ">
                    Join Now
                </button>
            </div>
        </div>
    );
};

export default TrainerBooking;
