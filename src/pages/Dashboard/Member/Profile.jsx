import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const Profile = () => {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/api/profile?email=${user.email}`).then((res) => {
                setProfileData(res.data);
                reset(res.data);
            });
        }
    }, [user, axiosSecure, reset]);

    const onSubmit = async (data) => {
        const payload = {
            name: data.name,
            photo: data.image,
        };

        try {
            const res = await axiosSecure.patch(`/api/update-profile?email=${user.email}`, payload);
            if (res.data.modifiedCount > 0) {
                toast.success("Profile updated successfully");
            } else {
                toast.info("No changes were made.");
            }
        } catch (error) {
            toast.error("Failed to update profile");
            console.error("Update error:", error);
        }
    };


    return (
        <div className="px-4 table_bg min-h-screen py-10">
        <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-xl shadow">
            <ToastContainer />
            <h2 className="text-3xl font-bold mb-6">Your Profile</h2>
            {profileData ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="font-semibold">Name</label>
                        <input
                            className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-lg mb-3"
                            {...register("name")}
                            placeholder="Name"
                        />
                    </div>
                    <div>
                        <label className="font-semibold">Email (read-only)</label>
                        <input
                            className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-lg mb-3"
                            value={user.email}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="font-semibold">Photo URL</label>
                        <input
                            className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-lg mb-3"
                            {...register("image")}
                            placeholder="Profile Photo URL"
                        />
                    </div>
                    <div>
                        <label className="font-semibold">Last Login</label>
                        <input
                            className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-lg mb-3"
                            value={user?.metadata?.lastSignInTime || ""}
                            readOnly
                        />
                    </div>
                    <button className="btn btn-primary w-full">Update Profile</button>
                </form>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
        </div>
    );
};

export default Profile;
