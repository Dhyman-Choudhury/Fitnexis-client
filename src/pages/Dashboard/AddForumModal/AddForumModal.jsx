import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader";
import { useQuery } from "@tanstack/react-query";

const AddForumModal = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/users');
            return res.data;
        },
    });

    const memUser = users.find(u => u.email === user?.email);

    const onSubmit = async (data) => {
        const post = {
            title: data.title,
            description: data.content,
            userName: user?.displayName,
            userEmail: user?.email,
            userRole: memUser?.role,  
            votes: 0,
            createdAt: new Date()
        };

        try {
            await axiosSecure.post("/addForums", post);
            toast.success("Forum post added successfully!");
            reset();
        } catch (err) {
            toast.error("Failed to add post");
        }
    };

    if (isLoading) return <Loader />;

    return (
        <div className="table_bg min-h-screen p-10">
            <ToastContainer />
            <h1 className="text-4xl text-white font-bold mb-10">Add New Forum Post</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <input
                    {...register("title", { required: true })}
                    type="text"
                    placeholder="Enter post title"
                    className="input input-bordered w-full p-3 bg-white border border-gray-300 rounded-lg"
                />

                <textarea
                    {...register("content", { required: true })}
                    placeholder="Enter your post content..."
                    className="textarea textarea-bordered w-full h-32 p-4 bg-white border border-gray-300 rounded-lg"
                />

                <button type="submit" className="btn btn-primary w-full">
                    Post
                </button>
            </form>
        </div>
    );
};

export default AddForumModal;
