import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllClasses = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const axiosSecure = useAxiosSecure();

  const {
    data: classesData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['classes', page, search],
    queryFn: () =>
      axiosSecure
        .get(`/slots/pagination?page=${page}&limit=6&search=${search}`)
        .then(res => res.data),
    keepPreviousData: true,
    retry: 1,
    onError: () => Swal.fire('Error', 'Failed to load classes', 'error'),
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    setSearch(searchInput.trim());
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Error loading classes</div>;

  const { classes, total, limit } = classesData;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-white">All Fitness Classes</h2>

      {/* 🔍 Search Input */}
      <form onSubmit={handleSearchSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Search classes by name..."
          className="px-4 py-2 rounded border w-full md:w-1/2 bg-white"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>

      {/* 📦 Class Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(classItem => (
          <div key={classItem.class_name} className="border bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{classItem.class_name}</h3>
            <p className="text-sm text-gray-600 mb-3">{classItem.details}</p>
            <p className="text-sm text-gray-500 mb-2">Slot: {classItem.slotName} ({classItem.slotTime})</p>
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              {(classItem.trainers || []).slice(0, 5).map(trainer => (
                <Link key={trainer.trainerId} to={`/trainers/${trainer.trainerId}`} title={trainer.name}>
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-16 h-16 rounded-full border hover:scale-110 transition"
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 🔢 Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-md ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
