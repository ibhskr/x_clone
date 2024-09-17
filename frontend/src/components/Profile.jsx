import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { IoCalendarOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import { TWEET_API_END_POINT, USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";
import Tweet from "./Tweet";
import { MdCloudUpload } from "react-icons/md";

function Profile() {
  const { user, profile } = useSelector((store) => store.user); // Ensure your store has the correct profile data
  const { id } = useParams();
  useGetProfile(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tweets, setTweets] = useState([]);
  const [uploadPP, setUploadPP] = useState(false);
  const [uploadCP, setUploadCP] = useState(false);

  // follow and unfollow handler
  const followAndUnfollowHandler = async () => {
    if (user.following.includes(id)) {
      // unfollow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {
          id: user?._id,
        });
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      // follow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {
          id: user?._id,
        });
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  // Fetch user tweets
  const fetchTweets = async () => {
    try {
      const response = await axios.get(
        `${TWEET_API_END_POINT}/usertweets/${id}`
      );
      setTweets(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, [id]);

  // upload profile photo and cover photo
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e, type) => {
    setSelectedFile({ file: e.target.files[0], type });
  };

  const handleSubmit = async (e, type) => {
    setIsUploading(true);
    e.preventDefault();

    if (!selectedFile || selectedFile.type !== type) {
      alert("Please select a valid file.");
      return;
    }

    const formData = new FormData();
    formData.append("myfile", selectedFile.file); // Using "myfile" as expected by the backend

    const apiUrl =
      type === "profilePic"
        ? `${USER_API_END_POINT}/upload/profile-picture/${id}`
        : `${USER_API_END_POINT}/upload/cover-picture/${id}`;

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully:", response.data);
      alert(
        type === "profilePic"
          ? "Profile picture uploaded successfully!"
          : "Cover picture uploaded successfully!"
      );

      if (type === "profilePic") {
        setUploadPP(false);
      } else {
        setUploadCP(false);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
    setIsUploading(false);
  };

  return (
    <div className="w-full p-4 relative border">
      {/* Profile Header section */}
      <div className="flex items-center border-b ">
        <Link to="/" className="ml-2 hover:bg-gray-200 rounded-full p-2">
          <IoMdArrowBack size="24px" />
        </Link>
        <div className="ml-4">
          <h1 className="font-bold">{profile?.name}</h1>
          <p className="text-gray-600">
            {profile?.tweets?.length + " " || "0 "}Post
          </p>
        </div>
      </div>

      {/* Profile Banner */}
      <div className="relative">
        {/* Cover Photo Section */}
        <div className="h-[200px] w-full bg-orange-700 relative">
          <img
            src={
              profile?.coverPic ||
              "https://images.unsplash.com/photo-1713283546996-58ebbb6d02a5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="banner"
            className="w-full h-full object-cover"
          />
          {/* Upload Icon for Cover */}
          {user?._id === profile?._id && (
            <div
              onClick={() => {
                setUploadCP(true);
                setUploadPP(false);
              }}
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer"
            >
              <MdCloudUpload size={24} />
            </div>
          )}
        </div>

        {/* Profile Picture Section */}
        <div className="absolute -bottom-16 left-4 border-2 border-black rounded-full">
          <Avatar
            alt="profile pic"
            src={profile?.profilePic || "https://via.placeholder.com/150"}
            sx={{ width: 100, height: 100 }}
          />
          {/* Upload Icon for Profile Pic */}
          {user?._id === profile?._id && (
            <div
              onClick={() => {
                setUploadPP(true);
                setUploadCP(false);
              }}
              className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer"
            >
              <MdCloudUpload size={20} />
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="text-right ">
        {user?._id === profile?._id ? (
          <button
            onClick={() => navigate(`/profile/${user?._id}/edit`)}
            className="hover:bg-gray-200 border border-gray-500 rounded-full px-4 m-2"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={followAndUnfollowHandler}
            className="hover:bg-gray-200 border border-gray-500 rounded-full px-4 m-2"
          >
            {user.following.includes(id) ? "Following" : "Follow"}
          </button>
        )}
      </div>

      {/* Profile Details */}
      <div className="mt-10">
        <div>
          <h1 className="font-bold">{profile?.name}</h1>
        </div>
        <p className="text-gray-600 text-sm">@{profile?.username}</p>
        <p className="mt-4">
          {profile?.bio ||
            "Hey there! Sharing thoughts, ideas, and a bit of myself on X."}
        </p>

        <div className="flex flex-row items-center text-gray-500 pt-2">
          <IoCalendarOutline />
          <p>
            Joined: {profile?.createdAt ? formatDate(profile.createdAt) : "N/A"}
          </p>
        </div>
        <p className="pb-4 text-gray-500">{`${profile?.following.length} following | ${profile.followers.length} followers`}</p>
      </div>

      {/* User Tweets */}
      <div>
        {tweets?.map((tweet) => (
          <Tweet key={tweet._id} tweet={tweet} className="overflow-x-scroll" />
        ))}
      </div>

      {/* Profile Picture Upload Section */}
      {uploadPP && (
        <div className="fixed inset-0 bg-slate-400 bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-[90%] w-full sm:w-1/3">
            <h2 className="text-lg font-bold mb-4">Upload Profile Picture</h2>
            <form onSubmit={(e) => handleSubmit(e, "profilePic")}>
              <input
                type="file"
                className="mb-4 border border-gray-300 p-2 w-full"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "profilePic")}
              />
              <div className="flex justify-end gap-2">
                {isUploading ? (
                  <div className="text-center text-indigo-500 font-semibold">
                    Uploading...
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-600"
                  >
                    Upload
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setUploadPP(false)}
                  className="bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cover Picture Upload Section */}
      {uploadCP && (
        <div className="fixed inset-0 bg-slate-400 bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-[90%] w-full sm:w-1/3">
            <h2 className="text-lg font-bold mb-4">Upload Cover Photo</h2>
            <form onSubmit={(e) => handleSubmit(e, "coverPic")}>
              <input
                type="file"
                className="mb-4 border border-gray-300 p-2 w-full"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "coverPic")}
              />
              <div className="flex justify-end gap-2">
                {isUploading ? (
                  <div className="text-center text-indigo-500 font-semibold">
                    Uploading...
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-600"
                  >
                    Upload
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setUploadCP(false)}
                  className="bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
