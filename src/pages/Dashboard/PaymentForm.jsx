// PaymentForm.jsx
import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';

const PaymentForm = ({ slot, price, packageType }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState('');
  const trainer = slot.trainers[0]
  
 
     
  // 🔐 Create Payment Intent
  useEffect(() => {
    if (price > 0) {
      // Backend: POST /create-payment-intent
      axiosSecure
        .post('/create-payment-intent', { price })
        .then(res => setClientSecret(res.data.clientSecret))
        .catch(() => toast.error('Failed to initialize payment'));
    }
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error('Card info not found');
      return;
    }

    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (methodError) {
      toast.error(methodError.message);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName || 'Anonymous',
          email: user.email,
        },
      },
    });

    if (confirmError) {
      toast.error(confirmError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      // ✅ Save payment to DB
      const paymentData = {
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        trainerId: trainer.trainerId,
        trainerName: trainer.name,
        slotId: slot._id,
        slotName: slot.slotName,
        className: slot.class_name,
        package: packageType,
        price: price,
        transactionId: paymentIntent.id,
        paymentIntentId: paymentIntent.client_secret,
        status: 'paid',
        createdAt: new Date(),
      };

      const paymentRes = await axiosSecure.post('/save-payment', paymentData);

      if (paymentRes.data.insertedId) {
        toast.success('Payment successful!');
        navigate('/dashboard');
      }
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <CardElement className="bg-white p-3 rounded mb-4" />
      <button
        className="btn btn-primary w-full"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay ${price}
      </button>
    </form>
  );
};

export default PaymentForm;
