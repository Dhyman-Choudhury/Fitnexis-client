import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';

const Newsletter = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxios()

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post('/newsletter', data);
      console.log(res)
      if (res.status === 200) {
        Swal.fire('✅ Subscribed!', 'Thank you for subscribing!', 'success');
        reset();
      } else {
        throw new Error('Subscription failed');
      }
    } catch (err) {
      Swal.fire('❌ Oops!', 'Something went wrong. Try again.', err);
    }
  };

  return (
    <div data-aos="flip-up" className=" bg-gradient-to-r from-[#234652] to-[#3c325d] py-16 px-4 text-center rounded-xl my-16 shadow-md w-full mx-auto">
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl text-white font-bold mb-4"
      >
        Subscribe to <span className="text-sky-500">Our Newsletter</span>
      </motion.h2>

      <motion.p
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-lg text-gray-300 mb-10"
      >
        Stay updated with our latest <span className="text-sky-600 font-semibold">classes</span>, tips, and exclusive offers!
      </motion.p>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col  gap-4 justify-center items-center"
      >
        <input
          {...register('name', { required: true })}
          type="text"
          placeholder="Your Name"
          className="px-4 py-2 bg-white rounded-md border w-full max-w-md"
        />
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="Your Email"
          className="px-4 py-2 bg-white rounded-md border w-full max-w-md"
        />
        <button
          type="submit"
          className="btn-primary max-w-md w-full"
        >
          Subscribe Now
        </button>
      </motion.form>
    </div>
  );
};

export default Newsletter;
