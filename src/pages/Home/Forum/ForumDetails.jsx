import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';

const ForumDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [userVote, setUserVote] = useState(null);

   useEffect(()=>{
      document.title= 'Details Forum | FitNexis'
    },[])

  const { data: forum, isLoading } = useQuery({
    queryKey: ['forum', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/forums/latest/${id}`);
      return res.data;
    }
  });

  const { data: voteStatus } = useQuery({
    queryKey: ['voteStatus', id, user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/forums/vote-status/${id}?email=${user.email}`);
      return res.data.vote;
    },
    enabled: !!user?.email && !!id,
    onSuccess: (vote) => setUserVote(vote),
  });

  const voteMutation = useMutation({
    mutationFn: async (type) => {
      return axiosSecure.patch(`/voteForums/${id}`, {
        userEmail: user.email,
        type,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['forum', id]);
      queryClient.invalidateQueries(['voteStatus', id, user?.email]);
    },
    onError: () => {
      toast.warn('Vote failed');
    },
  });

  const handleVote = (type) => {
    if (userVote === type) return;
    voteMutation.mutate(type);
    setUserVote(type);
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (!forum) return <div>Forum not found</div>;

  return (
    <div className='container'>
        <h1 className="text-4xl font-bold mb-10 text-center text-white">Forum Post Details</h1>
    <div className="max-w-3xl mx-auto p-10 bg-white rounded-2xl shadow-2xl ">
      <h1 className="text-3xl font-bold mb-2">{forum.title}</h1>
      <p className="text-gray-600 mb-4">
        <strong>Author:</strong> {forum.userName} <br />
        <strong>Role:</strong> {forum.userRole}
      </p>
      <p className="text-gray-700 mb-6">{forum.description}</p>

      <div className="flex gap-4 items-center">
        <button
          onClick={() => handleVote('up')}
          disabled={userVote === 'up' || voteMutation.isLoading}
          className='flex items-center gap-1 text-green-600 hover:text-green-800'
        >
           <AiFillLike size={18} />  ({forum.upVotes?.length || 0})
        </button>

        <button
          onClick={() => handleVote('down')}
          disabled={userVote === 'down' || voteMutation.isLoading}
          className="flex items-center gap-1 text-red-600 hover:text-red-800"
        >
          <AiFillDislike size={18} />  ({forum.downVotes?.length || 0})
        </button>
      </div>
    </div>
    </div>
  );
};

export default ForumDetails;
