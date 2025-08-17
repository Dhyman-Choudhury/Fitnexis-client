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
    document.title = "Profile | FitNexis";
  }, []);

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
    <div className="night_text px-4 table_bg min-h-screen py-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <ToastContainer />

        {/* Card 1 - Profile Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transition hover:shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Info</h2>
          {profileData ? (
            <>
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white ring-2 ring-gray-300 mb-6">
                <img
                  src={profileData?.photo || "/default-avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg">
                  <span className="font-semibold text-gray-700">Name: </span>
                  <span className="text-gray-900">{profileData.name || user.displayName}</span>
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-gray-700">Email: </span>
                  <span className="text-gray-900">{user.email}</span>
                </p>
                <p className="text-sm text-gray-500 mt-3">
                  Last Login: {user?.metadata?.lastSignInTime || "N/A"}
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Loading profile...</p>
          )}
        </div>

        {/* Card 2 - Update Profile */}
        <div className="bg-white rounded-2xl shadow-lg p-8 transition hover:shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h2>
          {profileData ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  {...register("name")}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Photo URL</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  {...register("image")}
                  placeholder="Profile Photo URL"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <p className="text-gray-500">Loading form...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
