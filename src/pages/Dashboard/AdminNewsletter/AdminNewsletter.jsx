import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../components/shared/Loader';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const AdminNewsletter = () => {
  const axiosSecure = useAxiosSecure();

  const { data: subscribers = [], isLoading, isError } = useQuery({
    queryKey: ['newsletterSubscribers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/newsletter');
      return res.data;
    },
  });

  return (
    <div className="night_text table_bg min-h-screen py-10">
    <div className="p-4 md:p-6">
      <h2 className="text-4xl text-white font-bold mb-5">📬 All Newsletter Subscribers</h2>

      {isLoading && <Loader></Loader>}
      {isError && <p className="text-red-500">Failed to load subscribers.</p>}

      {!isLoading && subscribers.length === 0 && (
        <p className="text-gray-500">No subscribers found.</p>
      )}

      {!isLoading && subscribers.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border-b">#</th>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber, index) => (
                <tr key={subscriber._id} className="bg-gray-200 text-gray-800 hover:bg-[#18353e] hover:text-gray-50">
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{subscriber.name}</td>
                  <td className="p-3 border-b">{subscriber.email}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default AdminNewsletter;
