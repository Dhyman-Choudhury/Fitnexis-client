import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import Loader from '../../../components/shared/Loader';
import useAuth from '../../../hooks/useAuth';

const TrainerManageSlot = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useAuth();

    // Fetch slots created by this trainer (filtered by email)
    const { data: slots = [], isLoading } = useQuery({
        queryKey: ['trainer-slots', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/trainer/slots?email=${user.email}`);
            return res.data;
        },
    });

    // Delete mutation (only if slot is not booked)
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/trainer/slots/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['trainer-slots']);
        },
        onError: () => toast.error('Failed to delete slot'),
    });

    const handleDelete = (id, isBooked) => {
        if (isBooked) {
            toast.error("Cannot delete a booked slot.");
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'This will delete the slot permanently.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Slot has been deleted successfully.',
                    timer: 2000,
                    showConfirmButton: false,
                });
                deleteMutation.mutate(id);
            }
        });
    };

    if (isLoading) return <Loader />;

    return (
        <div className="p-4">
            <ToastContainer/>
            <h2 className="night_text text-2xl font-bold mb-6 text-center">Manage Trainer Slots</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white text-left ">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Slot Name</th>
                            <th className="px-4 py-2">Time</th>
                            <th className="px-4 py-2">Class</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Booked By</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slots.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-8 text-gray-500">
                                    No slots found.
                                </td>
                            </tr>
                        ) : (
                            slots.map((slot, idx) => (
                                <tr key={slot._id} className="border-t hover:bg-gray-50 night_text">
                                    <td className="px-4 py-2">{idx + 1}</td>
                                    <td className="px-4 py-2">{slot.slotName}</td>
                                    <td className="px-4 py-2">{slot.slotTime}</td>
                                    <td className="px-4 py-2">{slot.class_name}</td>
                                    <td className="px-4 py-2">
                                        {slot.isBooked ? (
                                            <span className="text-red-500 font-semibold">Booked</span>
                                        ) : (
                                            <span className="text-green-600 font-semibold">Available</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {slot.isBooked ? (
                                            <>
                                                <div>{slot?.bookedBy || 'User ID'}</div>
                                                <div className="text-xs text-gray-500">{slot?.bookedClass}</div>
                                            </>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleDelete(slot._id, slot.isBooked)}
                                            className="btn-primary "
                                            disabled={slot.isBooked}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrainerManageSlot;
