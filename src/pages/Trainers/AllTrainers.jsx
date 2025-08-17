import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import Loader from '../../components/shared/Loader';
import useAxios from '../../hooks/useAxios';
import { motion } from 'framer-motion';

const AllTrainers = () => {
  useEffect(() => {
    document.title = 'AllTrainer | FitNexis';
  }, []);

  const axiosPublic = useAxios();

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const trainersPerPage = 6;

  const { data: trainers = [], isLoading, isError } = useQuery({
    queryKey: ['allTrainers'],
    queryFn: async () => {
      const res = await axiosPublic.get('/api/trainers');
      if (res.status !== 200) throw new Error('Failed to fetch trainers');
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">Error loading trainers.</p>;

  const getSlotName = (slotName) => {
    const name = slotName.toLowerCase();
    if (name.includes('morning')) return 'Morning';
    if (name.includes('afternoon')) return 'Afternoon';
    if (name.includes('evening')) return 'Evening';
    if (name.includes('night')) return 'Night';
    return slotName;
  };

  const availableDays = Array.from(
    new Set(trainers.flatMap((t) => t.availableDays || []))
  );

  const allSlotNames = ['Morning', 'Afternoon', 'Evening', 'Night'];
  const availableSlots = allSlotNames.filter(slot =>
    trainers.some(trainer =>
      trainer.availableSlots?.some(
        s => !s.isBooked && getSlotName(s.slotName) === slot
      )
    )
  );

  const experienceOptions = ['2yrs', '3yrs', '4yrs', '5yrs'];

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesDay = selectedDay ? trainer.availableDays?.includes(selectedDay) : true;
    const matchesSlot = selectedSlot
      ? trainer.availableSlots?.some(
          (s) => !s.isBooked && getSlotName(s.slotName) === selectedSlot
        )
      : true;
    const matchesExperience = selectedExperience
      ? trainer.experience?.toString().startsWith(selectedExperience[0])
      : true;
    return matchesDay && matchesSlot && matchesExperience;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTrainers.length / trainersPerPage));
  const paginatedTrainers = filteredTrainers.slice(
    (currentPage - 1) * trainersPerPage,
    currentPage * trainersPerPage
  );

  return (
    <div className="night_text container mx-auto px-2 md:px-6 my-0.5 rounded-lg">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 bg-gray-400 p-4 rounded-lg space-y-4 h-fit mt-6 lg:mt-16">
          <h2 className="text-xl font-bold mb-4">Filters</h2>

          <div>
            <label className="block mb-1 font-medium">Available Day</label>
            <select
              value={selectedDay}
              onChange={(e) => { setSelectedDay(e.target.value); setCurrentPage(1); }}
              className="w-full p-2 rounded text-black bg-white"
            >
              <option value="">All</option>
              {availableDays.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Available Slot</label>
            <select
              value={selectedSlot}
              onChange={(e) => { setSelectedSlot(e.target.value); setCurrentPage(1); }}
              className="w-full p-2 rounded text-black bg-white"
            >
              <option value="">All</option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Experience</label>
            <select
              value={selectedExperience}
              onChange={(e) => { setSelectedExperience(e.target.value); setCurrentPage(1); }}
              className="w-full p-2 rounded text-black bg-white"
            >
              <option value="">All</option>
              {experienceOptions.map((exp) => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl text-white font-bold mb-6">All Trainers</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedTrainers.map((trainer, i) => (
              <motion.div
                key={trainer._id}
                className="border bg-gray-400 rounded-xl border-gray-300 p-4 shadow-2xl flex flex-col h-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <motion.img
                  src={trainer?.profileImage}
                  alt={trainer?.name}
                  className="rounded-xl mx-auto mb-4 w-full h-56 object-cover"
                />
                <div className="flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold">Name: {trainer.name}</h2>
                  <p className="text-gray-800">Experience: {trainer.experience}</p>

                  <div className="flex gap-4 text-2xl mt-2">
                    <FaFacebookF className="bg-white rounded-full text-[#1877F2] p-1" />
                    <FaInstagram className="text-[#E1306C] p-1" />
                    <FaXTwitter className="text-black p-1" />
                  </div>

                  <p className="text-green-800 text-lg flex gap-2 mt-2 flex-wrap">
                    <span className="text-gray-800">Available Days:</span>
                    {trainer?.availableDays?.map((day, index) => <span key={index}>{day}</span>)}
                  </p>

                  <div className="mt-2">
                    <h3 className="text-gray-900 font-semibold mb-1">Available Slots:</h3>
                    {trainer?.availableSlots?.filter((slot) => !slot.isBooked).length > 0 ? (
                      <div className="flex gap-2 flex-wrap">
                        {trainer?.availableSlots
                          ?.filter((slot) => !slot.isBooked)
                          .map((slot) => (
                            <span key={slot._id} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                              {getSlotName(slot?.slotName)}
                            </span>
                          ))}
                      </div>
                    ) : (
                      <p className="text-gray-700">No available slots.</p>
                    )}
                  </div>

                  <Link
                    to={`/trainers/${trainer._id}`}
                    className="mt-4 btn-primary inline-block self-start"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded ${
                  page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTrainers;
