import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router"; // corrected import

const COLORS = ["#4F46E5", "#22C55E"];

// Reusable Stat Card
const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
    <p className="text-gray-500 text-sm md:text-base">{title}</p>
    <h2 className="text-2xl md:text-3xl font-bold mt-2">{value}</h2>
  </div>
);

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch balance & stats
  const {
    data: balanceData = {},
    isLoading: isBalanceLoading,
  } = useQuery({
    queryKey: ["adminBalance"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/balance");
      return res.data;
    },
  });

  // Fetch subscribers
  const {
    data: subscribers = [],
    isLoading: isSubscribersLoading,
  } = useQuery({
    queryKey: ["newsletterSubscribers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/newsletter");
      return res.data;
    },
  });

  // Fetch trainers
  const {
    data: trainers = [],
    isLoading: isTrainersLoading,
  } = useQuery({
    queryKey: ["allTrainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/trainers");
      return res.data;
    },
  });

  // Fetch applied trainers
  const {
    data: appliedTrainers = [],
    isLoading: isAppliedLoading,
  } = useQuery({
    queryKey: ["trainerApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/trainers/apply");
      return res.data;
    },
  });

  // Prepare chart data safely
  const chartData = useMemo(() => {
    return [
      { name: "Subscribers", value: balanceData?.totalNewsletterSubscribers || 0 },
      { name: "Paid Members", value: balanceData?.totalPaidMembers || 0 },
    ];
  }, [balanceData]);

  if (
    isBalanceLoading ||
    isSubscribersLoading ||
    isTrainersLoading ||
    isAppliedLoading
  )
    return <Loader />;

  return (
    <div className="night_text min-h-screen py-6 px-3 lg:px-6 bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        Admin Dashboard Overview
      </h1>

      {/* ==== STAT CARDS ==== */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Quick Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Balance"
            value={`$${balanceData?.totalBalance?.toFixed(2) || 0}`}
          />
          <StatCard
            title="Paid Members"
            value={balanceData?.totalPaidMembers || 0}
          />
          <StatCard
            title="Subscribers"
            value={balanceData?.totalNewsletterSubscribers || 0}
          />
          <StatCard title="Total Trainers" value={trainers.length || 0} />
          <StatCard
            title="Applied Trainers"
            value={appliedTrainers.length || 0}
          />
        </div>
      </section>

      {/* ==== CHART + TRANSACTIONS ==== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">
            Subscribers vs Paid Members
          </h3>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
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
        </div>

        {/* Last 6 Transactions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Last 6 Transactions</h3>
          {balanceData?.recentTransactions?.length ? (
            <ul className="space-y-3 max-h-64 overflow-y-auto">
              {balanceData.recentTransactions.slice(0, 6).map((tx, index) => (
                <li
                  key={index}
                  className="border-b last:border-b-0 pb-2 text-gray-700"
                >
                  <p>
                    <strong>Member:</strong> {tx.name}
                  </p>
                  <p>
                    <strong>Amount:</strong> ${tx.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(tx.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent transactions available.</p>
          )}
        </div>
      </section>

      {/* ==== RECENT SUBSCRIBERS ==== */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-10 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Recent Subscribers</h3>
        {subscribers.length ? (
          <table className="w-full border border-gray-200 text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 border-b">#</th>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.slice(-6).map((subscriber, index) => (
                <tr
                  key={subscriber._id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                >
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{subscriber.name}</td>
                  <td className="p-3 border-b">{subscriber.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No subscribers found.</p>
        )}
      </section>

      {/* ==== RECENT TRAINER APPLICATIONS ==== */}
      <section className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">
          Recent Trainer Applications
        </h3>
        {appliedTrainers.length ? (
          <>
            <table className="w-full border border-gray-200 text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 border-b">#</th>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b">Applied Date</th>
                  <th className="p-3 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {appliedTrainers.slice(-5).map((app, index) => (
                  <tr
                    key={app._id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                  >
                    <td className="p-3 border-b">{index + 1}</td>
                    <td className="p-3 border-b">{app.name || "N/A"}</td>
                    <td className="p-3 border-b">{app.email || "N/A"}</td>
                    <td className="p-3 border-b">
                      {app.created_at
                        ? new Date(app.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-3 border-b capitalize">{app.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </>
        ) : (
          <p className="text-gray-500">No trainer applications available.</p>
        )}
      </section>
    </div>
  );
};

export default AdminOverview;
