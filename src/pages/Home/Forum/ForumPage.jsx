import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { FaCrown, FaChalkboardTeacher } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../../components/shared/Loader';

const ForumPage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [page, setPage] = useState(1);

     useEffect(()=>{
        document.title= 'Forums | FitNexis'
      },[])

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['forums', page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/forums/page?page=${page}`);
            return res.data;
        }
    });

    const handleVote = async (id, type) => {
        try {
            await axiosSecure.patch(`/voteForums/${id}`, {
                userEmail: user.email,
                type
            });
            toast.success(`You ${type === 'up' ? 'upvoted' : 'downvoted'} the post`);
            refetch();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Vote failed');
        }
    };

    if (isLoading) return <Loader></Loader>;

    return (
        <div className='container'>
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">Community Forums</h2>

            <div className="space-y-6">
                {data?.forums?.map((forum) => (
                    <div
                        key={forum._id}
                        className="bg-white p-5 rounded-lg shadow-md border relative"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-bold">{forum.title}</h3>

                            {/* Badge */}
                            <div>
                                {forum.userRole === 'admin' && (
                                    <span className="flex items-center gap-1 text-yellow-600 font-medium">
                                        <FaCrown /> Admin
                                    </span>
                                )}
                                {forum.userRole === 'trainer' && (
                                    <span className="flex items-center gap-1 text-blue-600 font-medium">
                                        <FaChalkboardTeacher /> Trainer
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-700 mb-3">{forum.description}</p>

                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>Posted by {forum.userName}</span>
                            <span>{new Date(forum.createdAt).toLocaleString()}</span>
                        </div>

                        <div className="mt-3 flex items-center gap-4">
                            <button
                                onClick={() => handleVote(forum._id, 'up')}
                                className="flex items-center gap-1 text-green-600 hover:text-green-800"
                            >
                                <AiFillLike size={18} />
                                {forum.upVotes.length}
                            </button>
                            <button
                                onClick={() => handleVote(forum._id, 'down')}
                                className="flex items-center gap-1 text-red-600 hover:text-red-800"
                            >
                                <AiFillDislike size={18} />
                                {forum.downVotes.length}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-3">
                {[...Array(data.totalPages).keys()].map((num) => (
                    <button
                        key={num}
                        onClick={() => setPage(num + 1)}
                        className={`px-3 py-1 border rounded ${page === num + 1 ? 'bg-blue-500 text-white' : 'bg-white'
                            }`}
                    >
                        {num + 1}
                    </button>
                ))}
            </div>
        </div>
        </div>
    );
};

export default ForumPage;
