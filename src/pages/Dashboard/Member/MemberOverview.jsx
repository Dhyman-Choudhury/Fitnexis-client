import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import Loader from "../../../components/shared/Loader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const COLORS = ["#4F46E5", "#22C55E", "#F97316", "#EF4444"];

const MemberOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "Member Overview | FitNexis";
  }, []);

  // Fetch user profile
  const { data: profile = {}, isLoading: loadingProfile } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/email?email=${user.email}`);
      return res.data.user;
    },
  });

  // Fetch bookings
  const { data: bookings = [], isLoading: loadingBooking } = useQuery({
    queryKey: ["bookedTrainer", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/booked-trainer?email=${user.email}`);
      return res.data;
    },
  });

  // Fetch reviews
  const { data: reviews = [], isLoading: loadingReviews } = useQuery({
    queryKey: ["userReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user.email}`);
      return res.data;
    },
  });

  if (loadingProfile || loadingBooking || loadingReviews) return <Loader />;

  // Prepare chart data
  const chartData = [
    { name: "Bookings", value: bookings.length },
    { name: "Reviews", value: reviews.length },
    { name: "Remaining", value: Math.max(0, 10 - bookings.length) }, // example logic
  ];

  return  (
     <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Profile Section */}
        <motion.div 
          className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6 items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src={profile?.photo}
            alt={profile?.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-600 shadow-md"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800">{profile?.name}</h2>
            <p className="flex items-center text-gray-600 mt-2"><Mail className="w-4 h-4 mr-2" /> {profile?.email}</p>
            {profile?.phone && <p className="flex items-center text-gray-600"><Phone className="w-4 h-4 mr-2" /> {profile.phone}</p>}
            {profile?.address && <p className="flex items-center text-gray-600"><MapPin className="w-4 h-4 mr-2" /> {profile.address}</p>}
            <p className="flex items-center text-gray-600"><Calendar className="w-4 h-4 mr-2" /> Joined: {new Date(profile?.createdAt).toLocaleDateString()}</p>
          </div>
        </motion.div>

        {/* Stats + Chart Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-lg font-semibold">Total Bookings</h3>
            <p className="text-3xl font-bold text-indigo-600">{bookings.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-lg font-semibold">Total Reviews</h3>
            <p className="text-3xl font-bold text-green-600">{reviews.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-lg font-semibold">Role</h3>
            <p className="text-3xl font-bold text-orange-500 capitalize">{profile?.role || "member"}</p>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Activity Overview</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberOverview;
