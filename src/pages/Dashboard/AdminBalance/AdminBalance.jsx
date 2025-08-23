 import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Loader from '../../../components/shared/Loader';

const COLORS =  ['#8884d8', '#82ca9d'];

const AdminBalance = () => {
    const axiosSecure = useAxiosSecure();
    const [chartData, setChartData] = useState([]);

    const { data: balanceData = {}, isLoading } = useQuery({
        queryKey: ['adminBalance'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/balance');
            const data = res.data;
            setChartData([
                { name: 'Subscribers', value: data?.totalNewsletterSubscribers },
                { name: 'Paid Members', value: data?.totalPaidMembers },
            ]);
            return data;
        },
    });

    if (isLoading) return <Loader></Loader> ;

    return (
        <div className="night_text table_bg min-h-screen p-10 ">
            <h2 className="text-4xl font-bold mb-6 text-black"> Admin Financial Overview</h2>

            <div className="bg-white shadow-md rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-2">Total Balance</h3>
                <p className="text-3xl text-green-600 font-semibold">${balanceData?.totalBalance?.toFixed(2)}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Recent Transactions */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4">🧾 Last 6 Transactions</h4>
                    <ul className="space-y-2">
                        {balanceData?.recentTransactions?.map((tx, index) => (
                            <li key={index} className="border-b py-2">
                                <p><strong>Member:</strong> {tx.name}</p>
                                <p><strong>Amount:</strong> ${tx.price}</p>
                                <p className="text-sm text-gray-800">{new Date(tx?.createdAt).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chart */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4">📊 Subscribers vs Paid Members</h4>

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
            </div>
        </div>
    );
};

export default AdminBalance;
