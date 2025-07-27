import React, { useState } from 'react';
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
        <div>
            {
                app?.status === 'approved' ? <p className='text-red-600'>There is no activity log available.</p> : <div className="max-w-4xl mx-auto px-4 py-8">
                    <h2 className="text-2xl font-bold mb-6">Activity Log</h2>
                    <div className="space-y-4">

                        <div

                            className="flex items-center justify-between p-4 border rounded-lg shadow"
                        >
                            <div>
                                <p className="text-lg font-medium">{app.name}</p>
                                <p className="text-sm text-gray-500">Status: {app.status}</p>
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
        </div>

    );
};

export default ActivityLog;
