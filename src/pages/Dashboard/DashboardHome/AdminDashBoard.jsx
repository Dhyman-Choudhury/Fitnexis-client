import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch balance, newsletter, trainers, and applied trainer data
  const { data: balanceData = {}, isLoading: balanceLoading } = useQuery({
    queryKey: ["adminBalance"],
    queryFn: async () => (await axiosSecure.get("/admin/balance")).data,
  });

  const { data: subscribers = [], isLoading: subscribersLoading } = useQuery({
    queryKey: ["newsletterSubscribers"],
    queryFn: async () => (await axiosSecure.get("/newsletter")).data,
  });

  const { data: trainers = [], isLoading: trainersLoading } = useQuery({
    queryKey: ["allTrainers"],
    queryFn: async () => (await axiosSecure.get("/api/trainers")).data,
  });

  const { data: applications = [], isLoading: applicationsLoading } = useQuery({
    queryKey: ["trainerApplications"],
    queryFn: async () => (await axiosSecure.get("/api/trainers/apply")).data,
  });

  if (
    balanceLoading ||
    subscribersLoading ||
    trainersLoading ||
    applicationsLoading
  )
    return <Loader />;

  const chartData = [
    { name: "Subscribers", value: subscribers?.length },
    { name: "Paid Members", value: balanceData?.totalPaidMembers || 0 },
  ];

  return (
    <div className="min-h-screen p-4 md:p-10 table_bg">
      <h1 className="text-4xl font-bold text-white mb-8">Dashboard Overview</h1>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-4">
          <p className="text-gray-500 font-semibold">Total Trainers</p>
          <p className="text-2xl font-bold">{trainers?.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-4">
          <p className="text-gray-500 font-semibold">Pending Applications</p>
          <p className="text-2xl font-bold">{applications.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-4">
          <p className="text-gray-500 font-semibold">Newsletter Subscribers</p>
          <p className="text-2xl font-bold">{subscribers.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-4">
          <p className="text-gray-500 font-semibold">Total Balance</p>
          <p className="text-2xl font-bold">
            ${balanceData.totalBalance?.toFixed(2) || 0}
          </p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Subscribers vs Paid Members
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
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

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Last 6 Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border-b">Member</th>
                <th className="p-3 border-b">Amount</th>
                <th className="p-3 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {balanceData.recentTransactions?.map((tx, idx) => (
                <tr key={idx} className="bg-gray-200 hover:bg-[#18353e] hover:text-gray-50">
                  <td className="p-3 border-b">{tx.name}</td>
                  <td className="p-3 border-b">${tx.price}</td>
                  <td className="p-3 border-b">{new Date(tx.createdAt).toLocaleString()}</td>
                </tr>
              )) || <tr><td colSpan={3}>No transactions found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Trainer Applications */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Pending Trainer Applications</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Applied Date</th>
                <th className="p-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="bg-gray-200 hover:bg-[#18353e] hover:text-gray-50">
                  <td className="p-3 border-b">{app.name}</td>
                  <td className="p-3 border-b">{app.email}</td>
                  <td className="p-3 border-b">{new Date(app.created_at).toLocaleDateString()}</td>
                  <td className="p-3 border-b capitalize">{app.status}</td>
                </tr>
              )) || <tr><td colSpan={4}>No applications found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
