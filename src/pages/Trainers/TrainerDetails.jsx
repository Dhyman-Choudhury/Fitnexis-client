import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loader from '../../components/shared/Loader';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';

const TrainerDetails = () => {
  useEffect(() => {
    document.title = 'Trainer Details | FitNexis'
  }, [])
  const { trainerId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, isLoading } = useAuth()


  const {
    data: users = [],
    isFetching,
  } = useQuery({
    queryKey: ["searchedUsers"],

    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users`);
      return res.data;
    },
  });

  const {
    data: trainer = [],
    isLoading: loadingTrainer,
    isError: errorTrainer,
  } = useQuery({
    queryKey: ['trainerDetails', trainerId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/trainers/${trainerId}`);
      return res.data;
    },
  });

  const {
    data: slots = [],
    isLoading: loadingSlots,
    isError: errorSlots,
  } = useQuery({
    queryKey: ['trainerSlots', trainerId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/by-trainer/${trainerId}`);
      return res.data;
    },
    enabled: !!trainerId,
  });

  
  if (isLoading) return <Loader />
  if (loadingTrainer || loadingSlots || isFetching) return <Loader />;
  if (errorTrainer || errorSlots)
    return <p className="text-red-500">Error loading trainer data</p>;

  const isTrainer = users?.find(us => us?.email === user?.email)
  console.log(isTrainer)
  return (
    <div className="container mx-auto p-4 rounded-md shadow-lg">
      <ToastContainer />
      <div className="flex flex-col md:flex-row gap-8 mb-6">
        {/* Image */}
        <motion.div
          className="flex-1 p-5 flex justify-center items-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {trainer?.profileImage ? (
            <img
              src={trainer.profileImage}
              alt={trainer.name}
              className="rounded-lg object-cover max-h-80 max-w-full"
            />
          ) : (
            <div className="text-gray-400 italic">No image available</div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div
          className="flex-1 p-5 text-white"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2">Name: {trainer?.name}</h1>
          {trainer?.age && <p className="mb-2">Age: {trainer.age}</p>}
          {trainer?.bio && <p className=" mb-4">Bio: {trainer.bio}</p>}
          {trainer?.experience && <p className=" mb-4">Experience: {trainer.experience}</p>}

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {(trainer.skills || []).map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-600 rounded px-3 py-1 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {trainer?.availableDays?.length > 0 && (
            <p className="mb-4">
              Available Days:{' '}
              {trainer.availableDays.join(', ')}
            </p>
          )}


        </motion.div>
      </div>

      <h2 className="text-2xl text-white font-semibold mb-4">Available Slots</h2>
      {slots?.length === 0 && (
        <p className="text-gray-300">No slots available currently.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {slots?.map((slot, index) => (
          <motion.div
            key={slot._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-gray-800 rounded p-4"
          >

            {user ? (
              isTrainer?.role === 'member' ? (
                <Link
                  to={`/trainers/${trainer._id}/slots/${slot._id}`}
                  className="block text-center border border-blue-500 rounded py-3 hover:bg-blue-600 transition-colors text-gray-300 font-medium"
                >
                  <h3 className="text-lg"><strong>Slot Name:</strong> {slot.slotName}</h3>
                  <p><strong>Slot Time:</strong> {slot.slotTime}</p>
                  <p><strong>Class Name:</strong> {slot.class_name}</p>
                </Link>
              ) : (
                <div
                  onClick={() => {
                    toast.error('Only members can book a trainer');
                  }}
                  className="block text-center border border-blue-500 rounded py-3 hover:bg-blue-600 transition-colors text-white font-medium cursor-not-allowed"
                >
                  <h3 className="text-lg"><strong>Slot Name:</strong> {slot.slotName}</h3>
                 <p><strong>Slot Time:</strong> {slot.slotTime}</p>
                  <p><strong>Class Name:</strong> {slot.class_name}</p>
                </div>
              )
            ) : (
              <Link
                to="/login"
                className="block text-center border border-blue-500 rounded py-3 hover:bg-blue-600 transition-colors text-white font-medium"
               
              >
                <h3 className="text-lg"><strong>Slot Name:</strong> {slot.slotName}</h3>
                <p><strong>Slot Time:</strong> {slot.slotTime}</p>
                 <p><strong>Class Name:</strong> {slot.class_name}</p>
              </Link>
            )}



          </motion.div>
        ))}
      </div>
      {/* 
      {isFetching && <Loader></Loader>}

      {!isFetching && users.length === 0 && (
        <p className="text-gray-500">No users found.</p>
      )} */}
      {
        isTrainer?.status === "pending" || isTrainer?.status === "approved" ? <div className="mt-8 text-center">
          <Link
            disabeled

            className="inline-block btn-primary px-6 py-3 rounded hover:bg-blue-700"
          >
            Disabled
          </Link>
        </div> : <div className="mt-8 text-center">
          <Link
            to="/be-a-trainer"
            className="inline-block btn-primary px-6 py-3 rounded hover:bg-blue-700"
          >
            Become a Trainer
          </Link>
        </div>
      }

    </div>
  );
};

export default TrainerDetails;
