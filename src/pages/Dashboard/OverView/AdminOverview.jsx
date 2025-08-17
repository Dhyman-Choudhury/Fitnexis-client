import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../../components/shared/Loader';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router';

const COLORS = ['#8884d8', '#82ca9d'];

// Reusable Stat Card
const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center">
    <p className="text-gray-500 text-sm md:text-base">{title}</p>
    <h2 className="text-2xl md:text-3xl font-bold mt-2">{value}</h2>
  </div>
);

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();
  const [chartData, setChartData] = useState([]);

  // Fetch balance & transactions
  const { data: balanceData = {}, isLoading: isBalanceLoading } = useQuery({
    queryKey: ['adminBalance'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/balance');
      const data = res.data;
      setChartData([
        { name: 'Subscribers', value: data?.totalNewsletterSubscribers || 0 },
        { name: 'Paid Members', value: data?.totalPaidMembers || 0 },
      ]);
      return data;
    },
  });

  // Fetch subscribers
  const { data: subscribers = [], isLoading: isSubscribersLoading } = useQuery({
    queryKey: ['newsletterSubscribers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/newsletter');
      return res.data;
    },
  });

  // Fetch trainers
  const { data: trainers = [], isLoading: isTrainersLoading } = useQuery({
    queryKey: ['allTrainers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/trainers');
      return res.data;
    },
  });

  // Fetch applied trainers
  const { data: appliedTrainers = [], isLoading: isAppliedLoading } = useQuery({
    queryKey: ['trainerApplications'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/trainers/apply');
      return res.data;
    },
  });

  if (isBalanceLoading || isSubscribersLoading || isTrainersLoading || isAppliedLoading)
    return <Loader />;

  return (
    <div className="min-h-screen py-5 px-2 md:px-3 lg:px-5 bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">Admin Dashboard Overview</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mb-8 ">
        <StatCard title="💰 Total Balance" value={`$${balanceData?.totalBalance?.toFixed(2) || 0}`} />
        <StatCard title="🏋️ Paid Members" value={balanceData?.totalPaidMembers || 0} />
        <StatCard title="📬 Subscribers" value={balanceData?.totalNewsletterSubscribers || 0} />
        <StatCard title="💪 Total Trainers" value={trainers.length || 0} />
        <StatCard title="📝 Applied Trainers" value={appliedTrainers.length || 0} />
      </div>

      {/* Charts & Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">📊 Subscribers vs Paid Members</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">🧾 Last 6 Transactions</h3>
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {balanceData?.recentTransactions?.slice(0, 6).map((tx, index) => (
              <li key={index} className="border-b py-2">
                <p><strong>Member:</strong> {tx.name}</p>
                <p><strong>Amount:</strong> ${tx.price}</p>
                <p className="text-sm text-gray-500">{new Date(tx.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Subscribers Table */}
      <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto mb-8">
        <h3 className="text-xl font-semibold mb-4">📬 Recent Subscribers</h3>
        <table className="w-full border border-gray-200 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.slice(-6).map((subscriber, index) => (
              <tr key={subscriber._id} className="bg-gray-200 text-gray-800 hover:bg-[#18353e] hover:text-gray-50">
                <td className="p-3 border-b">{index + 1}</td>
                <td className="p-3 border-b">{subscriber.name}</td>
                <td className="p-3 border-b">{subscriber.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Applied Trainers Preview */}
      <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">📝 Recent Trainer Applications</h3>
        <table className="w-full border border-gray-200 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Applied Date</th>
              <th className="p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {appliedTrainers.slice(-5).map((app, index) => (
              <tr key={app._id} className="bg-gray-200 text-gray-800 hover:bg-[#18353e] hover:text-gray-50">
                <td className="p-3 border-b">{index + 1}</td>
                <td className="p-3 border-b">{app.name || 'N/A'}</td>
                <td className="p-3 border-b">{app.email || 'N/A'}</td>
                <td className="p-3 border-b">{new Date(app.created_at).toLocaleDateString() || 'N/A'}</td>
                <td className="p-3 border-b capitalize">{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-right">
          <Link to="/dashboard/appliedTrainerList" className="text-blue-600 hover:underline">
            View All Applications
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
