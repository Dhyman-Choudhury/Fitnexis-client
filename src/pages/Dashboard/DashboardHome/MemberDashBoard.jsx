import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import Loader from "../../../components/shared/Loader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const COLORS = ["#4F46E5", "#22C55E", "#F97316", "#EF4444"];
const MAX_BOOKINGS = 10;

const MemberOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "Member Overview | FitNexis";
  }, []);

  // Fetch user profile
  const {
    data: profile = {},
    isLoading: loadingProfile,
    error: profileError,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/email?email=${user.email}`);
      return res.data.user;
    },
  });

  // Fetch bookings
  const {
    data: bookings = [],
    isLoading: loadingBooking,
    error: bookingError,
  } = useQuery({
    queryKey: ["bookedTrainer", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/booked-trainer?email=${user.email}`);
      return res.data;
    },
  });

  // Fetch reviews
  const {
    data: reviews = [],
    isLoading: loadingReviews,
    error: reviewError,
  } = useQuery({
    queryKey: ["userReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user.email}`);
      return res.data;
    },
  });

  // If profile loading, block everything (can't show dashboard without user info)
  if (loadingProfile) return <Loader />;

  // Error handling for any query
  if (profileError || bookingError || reviewError) {
    return (
      <div className="text-center py-10 text-red-600">
        Failed to load data. Please try again later.
      </div>
    );
  }

  // Prepare chart data
  const chartData = [
    { name: "Bookings", value: bookings.length },
    { name: "Reviews", value: reviews.length },
    { name: "Remaining", value: Math.max(0, MAX_BOOKINGS - bookings.length) },
  ];

  return (
    <div className="night_text min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Profile Section */}
      

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-lg font-semibold">Total Bookings</h3>
            {loadingBooking ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              <p className="text-3xl font-bold text-indigo-600">
                {bookings.length}
              </p>
            )}
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-lg font-semibold">Total Reviews</h3>
            {loadingReviews ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              <p className="text-3xl font-bold text-green-600">
                {reviews.length}
              </p>
            )}
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-lg font-semibold">Role</h3>
            <p className="text-3xl font-bold text-orange-500 capitalize">
              {profile?.role || "member"}
            </p>
          </div>
        </motion.div>

        {/* Pie Chart Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Activity Overview
          </h3>
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
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
            {chartData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 inline-block rounded"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                ></span>
                {d.name}: {d.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberOverview;
