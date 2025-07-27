import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import groovyWalkAnimation from "../../../assets/json/Secure Login.json";

import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';
import Lottie from 'lottie-react';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {signIn} = useAuth()
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    useEffect(() => {
        document.title = "Login | FitNexis"
    }, [])

    const onSubmit =  (data) => {
      signIn(data.email, data.password)
      .then(result =>{
        console.log(result)
         Swal.fire({
        title: 'Login Successful!',
        text: 'Welcome back!',
        icon: 'success',
        confirmButtonText: 'OK',
      })
        navigate(from)
      })
      .catch(error=>{
        toast.warn(error.message)
      })
    };



    return (
        <div className='w-full bg-gray-200'>
            <ToastContainer/>
            <div className='w-11/12 mx-auto grid sm:grid-cols-1 md:grid-cols-2 gap-5 py-10 bg-gray-200 '>
                <div className=''>
                    <Lottie animationData={groovyWalkAnimation} loop={true} className='rounded-xl' />
                </div>
                <div className=" w-full mx-auto max-w-md rounded-md p-6 shadow-md bg-white">
                    <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">Sign In Now</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className="w-full px-3 py-2 border rounded-md border-gray-200 bg-gray-50 text-gray-800"
                                placeholder="Email address"
                            />
                            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-1 font-medium">Password</label>
                            <input
                                type="password"
                                {...register('password', { required: true, minLength: 6 })}
                                className="w-full px-3 py-2 border rounded-md border-gray-200 bg-gray-50 text-gray-800"
                                placeholder="Password"
                            />
                            {errors.password?.type === 'required' && (
                                <p className="text-red-500 text-sm">Password is required</p>
                            )}
                            {errors.password?.type === 'minLength' && (
                                <p className="text-red-500 text-sm">Password must be 6 characters or longer</p>
                            )}
                        </div>

                        <div className="text-right">
                            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
                        </div>

                        {/* Register Button */}
                        <button type="submit" className="btn-primary w-full px-8 py-3 font-semibold rounded-md text-gray-50 hover:bg-blue-600">
                            Login
                        </button>

                        {/* Login Link */}
                        <p className="text-sm text-center ">
                            Are you new?
                            <Link to="/register" className="text-blue-500 hover:underline ml-1">Register</Link>
                        </p>
                        <SocialLogin></SocialLogin>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
