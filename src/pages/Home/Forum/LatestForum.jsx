import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const LatestForums = () => {
  const axiosSecure = useAxiosSecure();

  const { data: forums = [], isLoading } = useQuery({
    queryKey: ['latestForums'],
    queryFn: async () => {
      const res = await axiosSecure.get('/forums/latest');
      return res.data;
    }
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className='container rounded-2xl'>
    <section className="max-w-6xl mx-auto px-4 py-10 ">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Latest Community Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forums.map((forum) => (
          <div key={forum._id} className="border rounded-xl p-5 shadow-md bg-white hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{forum.title}</h3>
            <p className="text-gray-600 mb-4">
              {forum.description.slice(0, 100)}...
            </p>
            <Link
              to={`/forums/${forum._id}`}
              className="text-blue-600 hover:underline font-medium"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default LatestForums;
