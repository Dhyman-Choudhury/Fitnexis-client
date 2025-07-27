import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
// আপনার auth hook

const options = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
];

const skillOptions = ['Weight Training', 'Cardio', 'Nutrition', 'CrossFit', 'Yoga'];

const BeATrainer = () => {
  useEffect(() => {
    document.title = 'BeATrainer | FitNexis'
  }, [])
  const { user } = useAuth(); // user info from context
  const { register, handleSubmit, control, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
   const [profilePic, setProfilePic] = useState('');

  const { mutate, isPending } = useMutation({
   mutationFn: async (data) => {
  const availableDays = data.availableDays.map((item) => item.value);
  const selectedSkills = Object.keys(data.skills).filter((key) => data.skills[key]);

  const payload = {
    name: data.name,
    email: data.email,
    age: data.age,
    bio: data.bio,
    profileImage: profilePic,
    experience: data.experience,
    created_at: new Date().toISOString(),
    availableTime: data.availableTime,
    availableDays,
    skills: selectedSkills,
  };

  const res = await axiosSecure.post('/api/trainers/apply', payload); // JSON body
  return res.data;
},

    onSuccess: () => {
      toast.success('Application submitted successfully!');
      reset();
      queryClient.invalidateQueries({ queryKey: ['trainerApplications'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Something went wrong.');
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        

        const formData = new FormData();
        formData.append('image', image);


        const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
        const res = await axios.post(imagUploadUrl, formData)

        setProfilePic(res.data.data.url);

    }
  return (
    <div className='container bg-[#18353e] w-full p-10'>
      <div className="max-w-3xl mx-auto p-6 bg-gray-200 rounded shadow-md">
        <ToastContainer />
        <h2 className="text-2xl font-semibold mb-4">Apply to Become a Trainer</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
          <input
            {...register('name', { required: true })}
            className="w-full border border-gray-300 p-2 rounded bg-white"
            placeholder="Full Name"
          />

          <input
            {...register('email', { required: true })}
            type="email"
            className="w-full border border-gray-300 p-2 rounded bg-white"
            placeholder="Email"
            defaultValue={user?.email || ''}
            readOnly
          />

          <input
            {...register('age', { required: true, min: 16, max: 80 })}
            type="number"
            className="w-full border border-gray-300 p-2 rounded bg-white"
            placeholder="Age"
          />
          <input
            {...register('experience', { required: true })}
            type="text"
            className="w-full border border-gray-300 p-2 rounded bg-white"
            placeholder="e.g. 5 yrs"
          />

          <Controller
            name="availableDays"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={options}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select Available Days"
              />
            )}
          />
          <input
            {...register('availableTime', { required: true })}
            type="text"
            className="w-full border border-gray-300 p-2 rounded bg-white"
            placeholder="Available Time (e.g., 10AM - 2PM)"
          />

          <div>
            <label className="block mb-1 font-medium">Your Skills:</label>
            <div className="flex flex-wrap gap-4">
              {skillOptions.map((skill) => (
                <label key={skill} className="flex items-center space-x-2">
                  <input type="checkbox" {...register(`skills.${skill}`)} />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
          </div>

          <textarea
            {...register('bio')}
            className="w-full border border-gray-300 p-2 rounded bg-white"
            placeholder="Tell us about yourself"
          ></textarea>

          <div>
            <label className="block mb-1 font-medium">Profile Image:</label>
            <input
              type="file"
             onChange={handleImageUpload}
              
              className="border border-gray-300 p-2 rounded bg-white"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary hover:bg-blue-700 disabled:opacity-50"
            disabled={isPending}
          >
            {isPending ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BeATrainer;
