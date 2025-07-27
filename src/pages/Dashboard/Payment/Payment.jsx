// Payment.jsx
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../../components/shared/Loader';
import PaymentForm from '../PaymentForm';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const { slotId } = useParams();
  const { search } = useLocation();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const packageType = new URLSearchParams(search).get('package');

  const { data: slot =[], isLoading } = useQuery({
    queryKey: ['slot', slotId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/slots/${slotId}`);
      return res.data;
    },
  });
const trainer = slot?.trainers?.map(tr=>tr.name)
  const packagePrices = {
    basic: 10,
    standard: 50,
    premium: 100,
  };
  const price = packagePrices[packageType] || 0;

  if (isLoading) return <Loader />;

  return (
    <div className="container max-w-2xl mx-auto p-6 rounded-lg my-2 text-white">
      <h2 className="text-4xl font-bold mb-4">Complete Your Payment</h2>

      <div className="bg-gray-800 p-4 rounded mb-6 space-y-2">
        <p><strong>Trainer:</strong> {trainer|| 'N/A'}</p>
        <p><strong>Slot Name:</strong> {slot?.slotName || 'N/A'}</p>
        <p><strong>Package:</strong> {packageType}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Your Name:</strong> {user?.displayName}</p>
        <p><strong>Your Email:</strong> {user?.email}</p>
      </div>

      <Elements stripe={stripePromise}>
        <PaymentForm
          slot={slot}
          price={price}
          packageType={packageType}
        />
      </Elements>
    </div>
  );
};

export default Payment;
