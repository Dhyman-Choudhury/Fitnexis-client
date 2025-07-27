import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader";

const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [emailQuery, setEmailQuery] = useState("");

    const {
        data: users = [],
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["searchedUsers", emailQuery],
        enabled: !!emailQuery,
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/users/search?email=${emailQuery}`);
            return res.data;
        },
    });

    const { mutateAsync: updateRole } = useMutation({
        mutationFn: async ({ id, role }) =>
            await axiosSecure.patch(`/api/users/${id}/role`, { role }),
        onSuccess: () => {
            refetch();
        },
    });

    const handleRoleChange = async (id, currentRole) => {
        const action = currentRole === "admin" ? "Remove admin" : "Make admin";
        const newRole = currentRole === "admin" ? "member" : "admin";

        const confirm = await Swal.fire({
            title: `${action}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        try {
            await updateRole({ id, role: newRole });
            Swal.fire("Success", `${action} successful`, "success");
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Failed to update user role", "error");
        }
    };

    return (
        <div className="px-4 table_bg min-h-screen py-10">
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Make Admin</h2>

            {/* Search Input */}
            <div className="flex items-center gap-2 mb-6">
                <FaSearch size={22} className="text-gray-300 " />
                <input
                    type="text"
                    className="w-full max-w-md px-4 py-2 border bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search user by email"
                    value={emailQuery}
                    onChange={(e) => setEmailQuery(e.target.value)}
                />
            </div>

            {isFetching && <Loader></Loader>}

            {!isFetching && users.length === 0 && emailQuery && (
                <p className="text-gray-500">No users found.</p>
            )}

            {users.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Created At</th>
                                <th className="py-2 px-4 border-b">Role</th>
                                <th className="py-2 px-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id} className="bg-gray-200 text-gray-800 hover:bg-[#18353e] hover:text-gray-50">
                                    <td className="py-2 px-4 border-b">{u.email}</td>
                                    <td className="py-2 px-4 border-b">
                                        {new Date(u.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <span
                                            className={`px-2 py-1 rounded text-sm font-medium
                                                ${u.role === "admin"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-200 text-gray-700"
                                                }`}
                                        >
                                            {u.role || "member"}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => handleRoleChange(u._id, u.role || "member")}
                                            className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded 
                                                ${u.role === "admin"
                                                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                                                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                                }`}
                                        >
                                            {u.role === "admin" ? (
                                                <>
                                                    <FaUserTimes />
                                                    Remove Admin
                                                </>
                                            ) : (
                                                <>
                                                    <FaUserShield />
                                                    Make Admin
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
        </div>
    );
};

export default MakeAdmin;
