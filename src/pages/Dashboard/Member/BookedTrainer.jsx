import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReviewModal from './ReviewModal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../../components/shared/Loader';

const BookedTrainer = () => {
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

   useEffect(()=>{
      document.title= 'Booked Trainer | FitNexis'
    },[])

  const { data: booking = [], isLoading } = useQuery({
    queryKey: ['bookedTrainer', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/booked-trainer?email=${user.email}`);
      return res.data;
    },
  });

    console.log(booking)
  const { data: users = [], isLoading: isFetching } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/email?email=${user.email}`);
      return res.data;
    },
  });

  
 
  const handleReview = (trainer) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(true);
  };

  if (isLoading || isFetching) return <Loader></Loader>;
//   if (!booking?.trainers || booking.trainers.length === 0)
    // return <p className="text-center text-red-500">No booked trainer found.</p>;

  return (
    <div className='night_text table_bg min-h-screen py-10'>
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl md:text-4xl text-black font-bold mb-10 text-center">Booked Trainer Details</h2>

     {
        booking?.map((data, index)=>
             <div key={data._id} className="bg-white p-8 rounded shadow mb-5">
        {/* Trainers Info */}
        <p># <small>{index+1}</small></p>
        <h3 className="text-2xl font-semibold mb-5">Trainer Info</h3>
        {data?.trainers?.map((trainer, index) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-4 border-b pb-4">
            
              <div>
                {trainer?.image && (
                <img
                  src={trainer?.image}
                  alt={trainer?.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}
              </div>
              <div>
              
                <p><span className="font-medium"><strong>Name:</strong> </span> {trainer?.name}</p>
                <p><span className="font-medium"><strong>Email:</strong> </span> {trainer?.email}</p>
                <p><span className="font-medium"><strong>Age:</strong> </span> {trainer?.age}</p>
               
              </div>
              <div>
              
                <p><span className="font-medium"><strong>Experience:</strong></span> {trainer?.experience}</p>
               <div className='flex gap-1'>
                <strong>Skills:</strong>
                {trainer?.skills?.map((skill, index) =><p key={index}><span className="font-medium"></span> {skill},</p> )}
                 
               </div>
               <div className='flex gap-1'>
                <strong>Available Days:</strong>
                {trainer?.availableDays?.map((day, index) =><p key={index}><span className="font-medium"></span> {day},</p> )}
                 
               </div>
                
               
              </div>
            
            <button
              onClick={() => handleReview(trainer)}
              className="btn-primary"
            >
              Leave a Review
            </button>
          </div>
        ))}

        {/* Class Info */}
        <h3 className="text-2xl font-semibold mb-2">Class Info</h3>
        <p className="mb-2"><strong>Name:</strong> <span >{data?.class_name}</span></p>
        <p className="mb-4"><strong>Details:</strong> <span>{data?.details}</span></p>

        {/* Slot Info */}
        <h3 className="text-2xl font-semibold mb-2">Slot Info</h3>
        <p className="mb-4">
          <span className="font-medium"><strong>Name:</strong> </span> {data?.slotName} <br />
          <span className="font-medium"><strong>Time:</strong> </span> {data?.slotTime}
        </p>

        {/* Other Info */}
        {data?.notes && (
          <>
            <h3 className="text-xl font-semibold mb-2">Other Info</h3>
            <p className="mb-4">{data?.notes}</p>
          </>
        )}
      </div>
        )
     }

      {/* Review Modal */}
      {isModalOpen && selectedTrainer && (
        <ReviewModal
          trainer={selectedTrainer}
          users={users}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
    </div>
  );
};

export default BookedTrainer;
