import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../../components/shared/Loader';

const AppliedTrainerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [feedback, setFeedback] = useState('');

    const { data: application, isLoading } = useQuery({
        queryKey: ['application', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/trainers/apply/${id}`);
            return res.data;
        }
    });

    const confirmMutation = useMutation({
        mutationFn: async () => await axiosSecure.patch(`/api/trainers/applications/${id}/confirm`),
        onSuccess: () => {
            Swal.fire('Success', 'Application confirmed and user promoted to Trainer.', 'success');
            navigate('/dashboard/appliedTrainers');
        },
        onError: () => Swal.fire('Error', 'Failed to confirm application.', 'error')
    });

    const rejectMutation = useMutation({
        mutationFn: async (feedbackData) =>
            await axiosSecure.patch(`/api/trainers/applications/${id}/reject`, feedbackData),
        onSuccess: () => {
            Swal.fire('Success', 'Application rejected and removed.', 'success');
            navigate('/dashboard/appliedTrainers');
        },
        onError: () => Swal.fire('Error', 'Failed to reject application.', 'error')
    });

    const handleConfirm = () => {
        Swal.fire({
            title: 'Are you sure you want to confirm this application?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel'
        }).then(result => {
            if (result.isConfirmed) {
                confirmMutation.mutate();
            }
        });
    };

    const handleReject = () => {
        Swal.fire({
            title: 'Reject Application',
            html:
                `<p>Applicant: ${application?.name || 'N/A'}</p>` +
                `<textarea id="feedback" class="swal2-textarea" placeholder="Enter rejection feedback...">${feedback}</textarea>`,
            focusConfirm: false,
            preConfirm: () => {
                const feedbackValue = Swal.getPopup().querySelector('#feedback').value;
                if (!feedbackValue) {
                    Swal.showValidationMessage('Feedback is required');
                }
                return feedbackValue;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                rejectMutation.mutate({ feedback: result.value });
            }
        });
    };

    if (isLoading) return <Loader></Loader>;
    if (!application) return <p>Application not found.</p>;

    return (
        <div className="night_text p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Application Details</h2>

            <div className="mb-6 space-y-2">
                <p><strong>Name:</strong> {application.name || 'N/A'}</p>
                <p><strong>Email:</strong> {application.email || 'N/A'}</p>
                <p><strong>Age:</strong> {application.age || 'N/A'}</p>
                <p><strong>Bio:</strong> {application.bio || 'N/A'}</p>
                <p><strong>Available Days:</strong> {application.availableDays || 'N/A'}</p>
                <p><strong>Available Time:</strong> {application.availableTime || 'N/A'}</p>
                <p><strong>Skills:</strong> {application.skills || 'N/A'}</p>
                <p><strong>Experience:</strong> {application.experience || 'N/A'}</p>
                <p><strong>Applied Date:</strong>{new Date(application.created_at || new Date()).toLocaleDateString()}</p>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={handleConfirm}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    disabled={confirmMutation.isPending}
                >
                    {confirmMutation.isPending ? 'Confirming...' : 'Confirm'}
                </button>

                <button
                    onClick={handleReject}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    disabled={rejectMutation.isPending}
                >
                    {rejectMutation.isPending ? 'Rejecting...' : 'Reject'}
                </button>
            </div>
        </div>
    );
};

export default AppliedTrainerDetails;
