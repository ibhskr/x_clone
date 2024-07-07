import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { IoCalendarOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";
function Profile() {
  const { user, profile } = useSelector((store) => store.user); // Ensure your store has the correct profile data
  const { id } = useParams();
  useGetProfile(id);
  const dispatch = useDispatch();
  //
  //
  //
  const followAndUnfollowHandler = async () => {
    if (user.following.includes(id)) {
      // unfollow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {
          id: user?._id,
        });
        dispatch(followingUpdate(id));
        dispatch(getRefresh);
        console.log(res);
        toast.success(res.data.message);
      } catch (error) {
        console.log(error);
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
        dispatch(getRefresh);
        console.log(res);
        toast.success(res.data.message);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
  // formatDate
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };
  return (
    <div className="w-full p-4 relative">
      {/* Profile Header section */}
      <div className="flex items-center border-b pb-4 mb-4">
        <Link to="/" className="ml-2 hover:bg-gray-200 rounded-full p-2">
          <IoMdArrowBack size="24px" />
        </Link>
        <div className="ml-4">
          <h1 className="font-bold">{profile?.name}</h1>
          <p className="text-gray-600">10 Posts</p>
        </div>
      </div>

      {/* Profile Banner */}
      <div className="h-[200px] w-full bg-orange-700 relative">
        <img
          src="https://images.unsplash.com/photo-1713283546996-58ebbb6d02a5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute -bottom-16 left-4 border-2 rounded-full w-fit border-black">
          <Avatar
            alt="profile pic"
            src={profile?.avatarUrl || "https://via.placeholder.com/150"} // Use a placeholder if no URL
            sx={{ width: 100, height: 100 }}
          />
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="text-right ">
        {user?._id === profile?._id ? (
          <button className="hover:bg-gray-200 border border-gray-500 rounded-full px-4 m-2">
            Edit Profile
          </button>
        ) : (
          <button
            onClick={() => followAndUnfollowHandler()}
            className="hover:bg-gray-200 border border-gray-500 rounded-full px-4 m-2"
          >
            {user.following.includes(id) ? "following" : "follow"}
          </button>
        )}
      </div>

      {/* Profile Details */}
      <div className="mt-10">
        <h1 className="font-bold">{profile?.name}</h1>
        <p className="text-gray-600 text-sm">@{profile?.username}</p>
        <p className="mt-4">
          {profile?.bio ||
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores obcaecati consectetur corrupti voluptates consequuntur quidem dolorum accusamus dicta enim libero."}
        </p>
        <div className="flex flex-row items-center  text-gray-600 pt-4">
          <IoCalendarOutline />
          <p>
            Joined: {profile?.createdAt ? formatDate(profile.createdAt) : "N/A"}
          </p>
        </div>
        <p className="pb-4 text-gray-600">{`${profile?.following.length} following | ${profile.followers.length} followers`}</p>
      </div>
    </div>
  );
}

export default Profile;
