import React from 'react';
import { useQuery } from '@tanstack/react-query';
 // or show spinner manually
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../../components/shared/Loader';

const TrainerTeamSection = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: trainers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['trainerTeam'],
    queryFn: () => axiosSecure.get('/api/trainers').then(res => res.data),
    onError: () => Swal.fire('Error', 'Failed to load trainers', 'error'),
  });

  if (isLoading) return <Loader />;

  if (isError || !Array.isArray(trainers) || trainers.length === 0) {
    return <div className="text-center text-red-600 text-xl py-10">No trainers available.</div>;
  }

  // Show only top 3 trainers
  const topTrainers = trainers.slice(0, 3);

  return (
    <section data-aos="flip-left" className="py-10 bg-gray-200 mb-10 rounded-xl">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Meet Our Trainers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topTrainers.map((trainer) => (
            <div key={trainer._id} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              <img
                src={trainer.profileImage}
                alt={trainer.name}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">{trainer.name}</h3>
              <p className="text-gray-600 mb-2">{trainer.bio || "No bio provided."}</p>
              <div className="mt-3">
                <span className="font-semibold text-gray-800">Expertise:</span>
                <ul className="list-disc list-inside text-gray-600">
                  {(trainer.skills || []).map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainerTeamSection;
