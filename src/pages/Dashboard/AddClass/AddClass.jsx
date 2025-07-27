import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const AddClass = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [profilePic, setProfilePic] = useState('');
  const [uploading, setUploading] = useState(false); // track image uploading state

  const { mutate: addClassMutation, isPending } = useMutation({
    mutationFn: async (data) => {
      const payload = {
        class_name: data.class_name,
        image: profilePic, // ⬅️ uploaded image URL
        details: data.details,
        created_at: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/classes", payload); // ⬅️ send JSON payload
      return res.data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        toast.success("Class added successfully!");
        reset();
        setProfilePic('');
        queryClient.invalidateQueries({ queryKey: ["classes"] });
      }
    },
    onError: (err) => {
      toast.error("Failed to add class");
      console.error(err);
    },
  });

  const onSubmit = (data) => {
    if (!profilePic) {
      toast.error("Please wait for image to upload.");
      return;
    }
    addClassMutation(data);
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('image', image);

    const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
    try {
      const res = await axios.post(uploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="table_bg min-h-screen py-10">
      <ToastContainer />
      <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Class</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Class Name */}
          <div>
            <label className="block mb-1 font-medium">Class Name</label>
            <input
              type="text"
              {...register("class_name", { required: true })}
              className="w-full p-2 border border-gray-300 rounded bg-white"
              placeholder="Enter class name"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium">Class Image:</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="border border-gray-300 p-2 rounded bg-white"
              required
            />
            {uploading && <p className="text-sm text-blue-600 mt-1">Uploading image...</p>}
          </div>

          {/* Details */}
          <div>
            <label className="block mb-1 font-medium">Details</label>
            <textarea
              {...register("details", { required: true })}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded bg-white"
              placeholder="Enter class details"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary"
            disabled={isPending || uploading}
          >
            {isPending ? "Submitting..." : uploading ? "Uploading Image..." : "Add Class"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
