import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../../components/shared/Loader';

const AppliedTrainerList = () => {
    const axiosSecure = useAxiosSecure();

    const { data: applications = [], isLoading, isError } = useQuery({
        queryKey: ['trainerApplications'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/trainers/apply');
            return res.data;
        }
    });

    if (isLoading) return <Loader></Loader>;
    if (isError) return <p>Failed to load applications</p>;

    return (
         <div className="night_text table_bg min-h-screen py-10">
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Applied Trainers</h2>
            {applications.length === 0 ? (
                <p>No trainer applications found.</p>
            ) : (
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100 mx-auto text-center">
                        <tr>
                            <th className="py-2 px-4 border-b">Applicant Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Applied Date</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app._id} className="bg-gray-200 text-gray-800 hover:bg-[#18353e] hover:text-gray-50 mx-auto text-center">
                                <td className="py-2 px-4 border-b">{app.name || 'N/A'}</td>
                                <td className="py-2 px-4 border-b">{app.email || 'N/A'}</td>
                                <td className="py-2 px-4 border-b">{new Date(app.created_at).toLocaleDateString() || 'N/A'}</td>
                                {/* <td className="py-2 px-4 border-b">{new Date(app.created_at || new Date()).toLocaleDateString()}</td> */}
                                <td className="py-2 px-4 border-b capitalize">{app.status}</td>
                                <td className="py-2 px-4 border-b">
                                    <Link
                                        to={`/dashboard/appliedTrainer/${app._id}`}
                                        className="btn-primary hover:underline"
                                    >
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </div>
    );
};

export default AppliedTrainerList;
