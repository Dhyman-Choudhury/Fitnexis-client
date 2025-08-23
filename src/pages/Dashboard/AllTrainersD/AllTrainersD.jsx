import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loader from '../../../components/shared/Loader';

const AllTrainersD = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Get all trainers
    const { data: trainers = [], isLoading, isError } = useQuery({
        queryKey: ['allTrainers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/trainers');
            return res.data;
        }
    });

    // Mutation to delete a trainer
    const deleteTrainerMutation = useMutation({
        mutationFn: async (id) => {
            return axiosSecure.delete(`/api/trainers/${id}`);
        },
        onSuccess: () => {
            Swal.fire('Deleted!', 'Trainer role has been removed.', 'success');
            queryClient.invalidateQueries({ queryKey: ['allTrainers'] });
        },
        onError: () => {
            Swal.fire('Error', 'Failed to delete trainer.', 'error');
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This trainer will be removed!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTrainerMutation.mutate(id);
            }
        });
    };

    if (isLoading) return <Loader></Loader>;
    if (isError) return <p>Failed to load trainers.</p>;

    return (
        <div className="night_text px-4 table_bg min-h-screen py-10">
            <h1 className="text-3xl md:text-4xl text-black font-bold mb-4">All Trainers</h1>
            <div className="overflow-x-auto">
                <table className="table w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-200 night_text">
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Photo</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Experience</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainers.map((trainer, index) => (
                            <tr key={trainer._id}>
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border">
                                    <img
                                        src={trainer.profileImage}
                                        alt={trainer.name}
                                        className="w-16 h-16 rounded-full "
                                    />
                                </td>
                                <td className="p-2 border">{trainer.name}</td>
                                <td className="p-2 border">{trainer.email}</td>
                                <td className="p-2 border">{trainer.experience || 'N/A'} </td>
                                <td className="p-2 border text-center">
                                    <button
                                        onClick={() => handleDelete(trainer._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {trainers.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">
                                    No trainers found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllTrainersD;
