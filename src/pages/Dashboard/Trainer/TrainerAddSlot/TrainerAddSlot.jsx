import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'; // Import Controller for react-select integration
import Select from 'react-select'; // Import react-select component
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loader from '../../../../components/shared/Loader';

const TrainerAddSlot = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedClassDetails, setSelectedClassDetails] = useState(null);

    // Initialize react-hook-form with control for Controller
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    // Fetch trainer data by user email
    const {
        data: trainer,
        isLoading: isTrainerLoading,
        isError: isTrainerError,
    } = useQuery({
        queryKey: ['trainerData', user?.email],
        queryFn: () =>
            axiosSecure.get(`/api/trainers/email?email=${user.email}`).then(res => res.data),
        enabled: !!user?.email,
        retry: 1,
        onError: () => Swal.fire('Error', 'Failed to load trainer data', 'error'),
    });

    // Fetch classes added by admin
    const {
        data: classesData,
        isLoading: isClassesLoading,
        isError: isClassesError,
    } = useQuery({
        queryKey: ['classes'],
        queryFn: () => axiosSecure.get('/classes/simple').then(res => res.data),
        retry: 1,
        onError: () => Swal.fire('Error', 'Failed to load classes', 'error'),
    });

    // Defensive: if classesData.data is an array, use it, else empty array
    // const classes = Array.isArray(classesData?.data) ? classesData.data : [];

    // Convert availableDays (array of strings) to react-select options [{value,label}]
    const daysOptions = (trainer?.availableDays || []).map(day => ({
        value: day,
        label: day,
    }));

    // On form submit
    const onSubmit = async (data) => {
        if (!trainer) return;

        // Find the selected class details for extra info
        const selectedClass = classesData.find(cls => cls.class_name === data.selectedClass);

        // Prepare slot data to send to backend
        const slotData = {
            slotName: data.slotName,
            slotTime: data.slotTime,
            class_name: data.selectedClass,
            details: selectedClass?.details || '',
            isBooked: false,
            notes: data.notes || '',
            createdAt: new Date().toISOString(),
            trainers: [
                {
                    trainerId: trainer._id,
                    name: trainer.name,
                    email: trainer.email,
                    image: trainer.profileImage,
                    age: trainer.age,
                    // Extract selected days values (array of strings)
                    availableDays: data.availableDays ? data.availableDays.map(d => d.value) : [],
                }
            ],
        };

        try {
            const res = await axiosSecure.post('/slots', slotData);
            if (res.data.insertedId) {
                Swal.fire('Success', 'Slot added successfully', 'success');
                reset(); // Reset form after success
            }
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Failed to add slot', 'error');
        }

         const slotPayload = [
      {
        slotName: data.slotName,
        slotTime: data.slotTime,
        details: data.details,
        createdAt: new Date().toISOString(),
        isBooked: false,
      },
    ];

    try {
      const res = await axiosSecure.patch(`/api/trainers/${trainer._id}/slots`, {
        slots: slotPayload,
      });

      if (res.data.message === 'Slots added successfully') {
        Swal.fire('Success!', 'Slot added to trainer', 'success');
        reset();
      } else {
        Swal.fire('Error', res.data.message, 'error');
      }
    } catch (error) {
      console.error('Error adding slot:', error);
      Swal.fire('Failed', 'Something went wrong', 'error');
    }
    };

    // Show loader while data is loading
    if (isTrainerLoading || isClassesLoading) {
        return <Loader />;
    }

    // Show error messages if failed to load trainer or classes
    if (isTrainerError) {
        return <div className="text-center text-red-600">Failed to load trainer data</div>;
    }
    if (isClassesError) {
        return <div className="text-center text-red-600">Failed to load classes</div>;
    }

    return (
        <div className="table_bg min-h-screen py-10">
            <div className="max-w-3xl mx-auto p-6 bg-gray-200 rounded-2xl shadow">
                <h2 className="text-4xl font-bold mb-6">Add New Slot</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Read-only Trainer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="font-semibold">Name</label>
                            <input
                                readOnly
                                value={trainer.name}
                                className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-lg mb-3"
                            />
                        </div>
                        <div>
                            <label className="font-semibold">Email</label>
                            <input
                                readOnly
                                value={trainer.email}
                                className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-lg mb-3"
                            />
                        </div>
                        <div>
                            <label className="font-semibold">Age</label>
                            <input
                                readOnly
                                value={trainer.age}
                                className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-lg mb-3"
                            />
                        </div>
                        <div>
                            <label className="font-semibold">Bio</label>
                            <input
                                readOnly
                                value={trainer.bio}
                                className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-lg mb-3"
                            />
                        </div>
                        <div>
                            <label className="font-semibold">Experience</label>
                            <input
                                readOnly
                                value={trainer.experience}
                                className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-lg mb-3"
                            />
                        </div>
                        <div>
                            <label className="font-semibold">Skills</label>
                            <input
                                readOnly
                                value={trainer.skills?.join(', ')}
                                className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-lg mb-3"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="font-semibold mb-2 block">Available Days</label>
                            {/* React Select multi-select for availableDays */}
                            <Controller
                                name="availableDays"
                                control={control}
                                defaultValue={daysOptions}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={daysOptions}
                                        isMulti
                                        classNamePrefix="react-select"
                                        placeholder="Select available days"
                                    // Note: If you want to make it readonly, add isDisabled prop here:
                                    // isDisabled
                                    />
                                )}
                            />
                            {errors.availableDays && (
                                <p className="text-red-500 text-sm mt-1">Please select at least one day</p>
                            )}
                        </div>
                    </div>

                    {/* Slot Name */}
                    <div>
                        <label className="font-semibold">Slot Name</label>
                        <input
                            {...register('slotName', { required: true })}
                            placeholder="e.g., Morning Slot"
                            className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-lg"
                        />
                        {errors.slotName && (
                            <p className="text-red-500 text-sm mt-1">Slot name is required</p>
                        )}
                    </div>

                    {/* Slot Time */}
                    <div>
                        <label className="font-semibold">Slot Time</label>
                        <input
                            {...register('slotTime', { required: true })}
                            placeholder="e.g., 1 hour"
                            className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-lg"
                        />
                        {errors.slotTime && (
                            <p className="text-red-500 text-sm mt-1">Slot time is required</p>
                        )}
                    </div>

                    {/* Classes Include */}
                    <div>
                        <label className="font-semibold">Select Class</label>
                        <select
                            {...register('selectedClass', { required: true })}
                            className="select select-bordered w-full bg-white p-3 rounded-lg border border-gray-300"
                        >
                            <option value="">Select a class</option>
                            {classesData.length > 0 ? (
                                classesData.map((cls) => (
                                    <option key={cls._id} value={cls.class_name}>
                                        {cls.class_name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No classes available</option>
                            )}
                        </select>
                        {errors.selectedClass && (
                            <p className="text-red-500 text-sm mt-1">Class selection is required</p>
                        )}
                    </div>

                    {/* Other Info */}
                    <div>
                        <label className="font-semibold">Other Info (Optional)</label>
                        <textarea
                            {...register('notes')}
                            className="textarea textarea-bordered w-full bg-white border border-gray-300 rounded-lg p-5"
                            placeholder="Any additional notes..."
                            rows={4}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-right">
                        <button type="submit" className="btn btn-primary px-8 py-3">
                            Add Slot
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TrainerAddSlot;
