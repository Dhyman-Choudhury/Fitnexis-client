import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/shared/Loader";

const AdminProfile = () => {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        document.title = "Admin Profile | FitNexis";
    }, []);

    // Fetch profile from API
    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/api/profile?email=${user.email}`)
                .then((res) => setProfileData(res.data))
                .catch((err) => console.error("Failed to fetch profile:", err));
        }
    }, [user, axiosSecure]);

    if (!profileData) return <Loader />;

    return (
        <div className="night_text min-h-screen p-4 md:p-10 table_bg">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 md:p-10">
                {/* Profile Picture */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={profileData?.photo || "/default-avatar.png"}
                        alt={profileData?.name || "Profile"}
                        className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                    />

                    <h2 className="text-2xl font-bold mt-1 text-gray-800">{profileData?.name || "N/A"}</h2>
                    <span className="mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        Verified
                    </span>
                </div>

                {/* Profile Details */}
                <div className="space-y-4 text-gray-700">
                    <div className="flex justify-between">
                        <span className="font-semibold">Date Join</span>
                        <span>
                            {profileData?.created_at
                                ? new Date(profileData.created_at).toLocaleDateString()
                                : "N/A"}
                        </span>

                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Status</span>
                        <span>{profileData?.status || "Active"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Name</span>
                        <span>{profileData?.name || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Email</span>
                        <span>{profileData?.email || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Role</span>
                        <span>{profileData?.role || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Phone Number</span>
                        <span>{profileData?.phone || "+880123456789"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Address</span>
                        <span>{profileData?.address || "Dhaka, Bangladesh"}</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
