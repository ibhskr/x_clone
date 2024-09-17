import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const profile = useSelector((store) => store.user.profile);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (profile) {
      setValue("name", profile.name);
      setValue("username", profile.username);
      setValue("email", profile.email);
      setValue("bio", profile.bio); // Set the bio value
    }
  }, [profile, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(
        `${USER_API_END_POINT}/update-profile/${profile._id}`, // Use constant for API base URL
        data, // Sending data as JSON
        {
          headers: {
            "Content-Type": "application/json", // Specify JSON format
          },
        }
      );
      console.log(response.data);
      toast.success("Profile updated successfully");
      navigate(-1);
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      toast.error("ubable to update your profile");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            {...register("bio", { required: "Bio is required" })}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            rows="4"
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
