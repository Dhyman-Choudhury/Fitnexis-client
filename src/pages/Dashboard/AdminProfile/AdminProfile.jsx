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
        <div className="min-h-screen p-4 md:p-10 table_bg">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">Admin Profile</h2>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                    <img
                        src={profileData?.photo || "/default-avatar.png"}
                        alt={profileData?.name || "Admin"}
                        className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                    />
                    <div className="flex-1 space-y-2">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">Name</h3>
                            <p className="text-gray-600">{profileData?.name || "N/A"}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">Email</h3>
                            <p className="text-gray-600">{profileData?.email || "N/A"}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
                            <p className="text-gray-600">{profileData?.phone || "N/A"}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">Address</h3>
                            <p className="text-gray-600">{profileData?.address || "N/A"}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">Role</h3>
                            <p className="text-gray-600">{profileData?.role || "Admin"}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">Last Login</h3>
                            <p className="text-gray-600">
                                {profileData?.last_log_in
                                    ? new Date(profileData.last_log_in).toLocaleString()
                                    : "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
