import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import Loader from '../../../components/shared/Loader';

const FeaturedClasses = () => {
  const axios = useAxios();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['featured-classes'],
    queryFn: async () => {
      const res = await axios.get('/class-bookings');
      return res.data;
    },
  });

  const { data: classList = [], isLoading: isFetching } = useQuery({
    queryKey: ['other-classes'],
    queryFn: async () => {
      const res = await axios.get('/classes/simple');
      return res.data;
    },
  });

  if (isLoading || isFetching) return <Loader />;

  const classIds = bookings?.map(cls => cls._id);
  const matchedClsInfo = classList?.filter(cls =>
    classIds.includes(cls.class_name)
  );

  const mergedData = bookings.map(booking => {
    const matched = matchedClsInfo.find(cls => cls.class_name === booking._id);
    return {
      ...booking,
      image: matched?.image,
      details: matched?.details,
    };
  });

  return (
    <section className="night_text py-10 px-2  md:px-6 bg-gray-200 rounded-xl">
      <div className="mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Featured Classes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {mergedData?.map((cls) => (
            <div key={cls._id} className="bg-white shadow-md rounded-xl p-5 space-y-3">
              {cls.image && (
                <img
                  src={cls.image}
                  alt={cls._id}
                  className="rounded-xl mb-4 h-48 w-full object-cover"
                />
              )}
              <h3 className="text-xl font-semibold">
                <strong>Class Name:</strong> {cls._id}
              </h3>
              <p className="text-xl font-medium mt-2">
                <strong>Total Bookings:</strong> {cls.totalBookings}
              </p>
              <p className="text-gray-700">
                {cls?.details || 'No description available'}
              </p>
              {/*.slice(0, 80)
               <Link
                to={`/classes/${cls._id}`}
                className="btn-primary"
              >
                View Details
              </Link> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedClasses;
