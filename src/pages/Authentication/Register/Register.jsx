
import { useForm } from 'react-hook-form';
import groovyWalkAnimation from "../../../assets/json/Secure Login.json";
import { Link, useLocation, useNavigate } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import Lottie from 'lottie-react';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import SocialLogin from '../SocialLogin/SocialLogin';


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth()
    // const [profilePic, setProfilePic] = useState('');
    const axiosInstance = useAxios();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = async (data) => {
        createUser(data.email, data.password)
            .then(async (result) => {

                const userInfo = {
                    name: data.name,
                    photo: data.photo,
                    email: data.email,
                    role: 'user',
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString(),
                };

                const userRes = await axiosInstance.post('/users', userInfo);
                console.log(userRes.data)

                //update user profile in firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: data.photo
                }
              updateUserProfile(userProfile)
                   .then(()=>{
                    navigate(from);
                   })
                   .catch(error => {
                    toast.warn(error.message)
                   })

            })
            .catch(error =>{
                toast.warn(error.message)
            })
        
    };



    return (
        <div className='w-full bg-gray-200'>
            <div className='w-11/12 mx-auto grid sm:grid-cols-1 md:grid-cols-2 gap-5 py-10 bg-gray-200 '>
                <div className=''>
                    <Lottie animationData={groovyWalkAnimation} loop={true} className='rounded-xl' />
                </div>
                <div className=" w-full mx-auto max-w-md rounded-md p-6 shadow-md bg-white">
                    <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">Create Account</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="block mb-1 font-medium">Name</label>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                className="w-full px-3 py-2 border rounded-md border-gray-200 bg-gray-50 text-gray-800"
                                placeholder="Your name"
                            />
                            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                        </div>

                        {/* Photo URL Upload */}
                        <div>
                            <label className="block mb-1 font-medium">Profile Photo</label>
                            <input
                                type="url"
                                {...register('photo', { required: true })}
                                className="w-full px-3 py-2 border rounded-md border-gray-200 bg-gray-50 text-gray-800"
                                placeholder="Photo URL"
                            />
                            {errors.photo && <p className="text-red-500 text-sm">Photo url is required</p>}
                        </div>

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
                            Register
                        </button>

                        {/* Login Link */}
                        <p className="text-sm text-center ">
                            Already have an account?
                            <Link to="/login" className="text-blue-500 hover:underline ml-1">Login</Link>
                        </p>
                        <SocialLogin></SocialLogin>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
