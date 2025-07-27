import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import Loader from '../../../components/shared/Loader';

const FeaturedClasses = () => {
    const axios = useAxios();

    const { data: classes = [], isLoading } = useQuery({
        queryKey: ['featured-classes'],
        queryFn: async () => {
            const res = await axios.get('/class-bookings');
            return res.data;
        },
    });

    console.log(classes)
    if (isLoading) return <Loader></Loader>;

    return (
        <section className="py-12 bg-gray-50">
            <div className=" mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Featured Classes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {classes.map((cls) => (
                        <div key={cls._id} className="bg-white shadow-md rounded-xl p-5 space-y-3">
                            <img src={cls.image} alt={cls._id} className="rounded-xl mb-4 h-48 w-full object-cover" />
                            <h3 className="text-xl font-semibold">{cls._id}</h3>
                            <p className="text-gray-600">{cls.description?.slice(0, 60)}...</p>
                            <p className="text-sm text-gray-500 mt-2">Total Bookings: {cls.totalBookings}</p>
                        {/* <p className="text-sm text-gray-500">Time: {cls.schedule}</p> */}
                            <Link
                                to={`/classes/${cls._id}`}
                                className="btn-primary"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedClasses;
