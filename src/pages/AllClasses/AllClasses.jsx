import { useEffect, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loader from '../../components/shared/Loader';
import { FaSearch } from 'react-icons/fa';

const AllClasses = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = 'All Classes | FitNexis';
  }, []);

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

  const { classes = [], total = 0, limit = 6 } = classesData;
  const totalPages = Math.ceil(total / limit);

  // Always call hooks before returning anything
  const sortedClasses = useMemo(() => {
    return [...classes].sort((a, b) => {
      if (sortBy === 'name') return a.class_name.localeCompare(b.class_name);
      if (sortBy === 'slot') return a.slotTime.localeCompare(b.slotTime);
      return 0;
    });
  }, [classes, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  // Now render conditionally INSIDE JSX
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Error loading classes</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 my-0.5 rounded-lg flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 mb-6 md:mb-0 flex flex-col gap-4 mt-10 md:mt-20">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search classes by name..."
            className="w-full pl-10 pr-4 py-2 rounded border bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </form>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 bg-white"
          >
            <option value="name">Name (A-Z)</option>
            <option value="slot">Slot Time (Earliest)</option>
          </select>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white">All Fitness Classes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedClasses.map(classItem => (
            <motion.div
              key={classItem.class_name}
              className="border bg-white rounded-xl p-5 shadow hover:shadow-lg transition flex flex-col"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2">{classItem.class_name}</h3>
                <p className="text-sm text-gray-600 mb-3">{classItem.details}</p>
                <p className="text-sm text-gray-500 mb-2">Slot: {classItem.slotName} ({classItem.slotTime})</p>
              </div>

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
            </motion.div>
          ))}
        </div>

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
    </div>
  );
};

export default AllClasses;
