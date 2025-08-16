import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Eye } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import Loader from '../../../components/shared/Loader';
import useAuth from '../../../hooks/useAuth';

const ActivityLog = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
            document.title= 'Activity Log | FitNexis'
          },[])

    const { data: app = [], isLoading } = useQuery({
        queryKey: ['trainerApplications', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/profile?email=${user?.email}`);
            return res.data;
        }
    });

    
    if (isLoading) return <Loader></Loader>;

    const openModal = (application) => {
        setSelectedApplication(application);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedApplication(null);
    };

    return (
        <div className='table_bg min-h-screen py-10'>
           { app?.status? <>
           {
                app?.status === 'approved' ? <p className='text-red-600'>There is no activity log available.</p> : 
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <h2 className="text-4xl font-bold mb-10 text-gray-50">Activity Log</h2>
                    <div className="space-y-4">

                        <div

                            className="flex items-center justify-between p-6 border border-gray-300 rounded-lg shadow bg-gray-100"
                        >  <div>
                                <img
                                    src={app?.photo || '/default-profile.png'}
                                    alt={app?.name || 'Applicant Photo'}
                                    className="w-20 h-20 rounded-full object-cover shadow-md hover:shadow-xl transition-shadow duration-300"
                                />


                            </div>
                            <div>
                                <p className="text-lg "><strong>Name:</strong> {app?.name}</p>
                                <p className="text-lg "><strong>Email:</strong> {app?.email}</p>
                                <p className="text-lg "><strong>Applied At:</strong> {new Date(app?.created_at).toISOString().split("T")[0]}</p>
                                <p className="text-lg"><strong>Status:</strong> {app.status}</p>
                            </div>

                            {app.status === 'rejected' && (
                                <button
                                    onClick={() => openModal(app)}
                                    className="text-blue-600 hover:underline"
                                >
                                    <Eye />
                                </button>
                            )}

                        </div>

                    </div>

                    {/* Modal */}
                    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                        <div className="fixed inset-0 flex items-center justify-center p-4">
                            <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow-lg">
                                <Dialog.Title className="text-xl font-bold mb-4">
                                    Rejection Feedback
                                </Dialog.Title>
                                <p>{selectedApplication?.feedback || 'No feedback provided.'}</p>
                                <button
                                    onClick={closeModal}
                                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Close
                                </button>
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                </div>

            }
           </> : <p className='text-red-600 text-center text-lg'>There is no activity log available.</p>}
            
        </div>

    );
};

export default ActivityLog;
