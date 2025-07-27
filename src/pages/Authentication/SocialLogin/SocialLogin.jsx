import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
    const axiosPublic = useAxios();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(async (result) => {
                const user = result.user;

                const userInfo = {
                    name: user.displayName,
                    photo: user.photoURL,
                    email: user.email,
                    role: 'member',
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                };

                const res = await axiosPublic.post('/api/users', userInfo);

                if (res.status === 200 || res.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'User info saved!',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }

                toast.success('Successfully signed in!');
                navigate(from);
            })
            .catch(error => {
                console.error(error);
                toast.error('Google Sign-in Failed');
            });
    };

    return (
        <div className='w-2/3 text-center flex flex-col justify-center'>
            <ToastContainer/>
            <p className='mb-4'>OR</p>
            <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-3 px-4 py-2 border border-gray-200 rounded-2xl shadow-md bg-white hover:bg-gray-100 transition duration-200"
            >
                <FcGoogle size={25} />
                <span className="text-sm font-medium text-gray-700">Login with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;
