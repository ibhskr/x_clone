import React from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import useGetProfile from "../hooks/useGetProfile";

function RightSidebar({ otherUsers }) {
  const navigate = useNavigate();

  const navigateProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className=" w-fit mt-2 hidden sm:block ">
      {/* Search Bar */}
      <div className="p-2 bg-gray-100 rounded-full flex items-center">
        <CiSearch size="20px" />
        <input
          type="text"
          className="outline-none bg-transparent ml-2"
          placeholder="Search"
        />
      </div>

      {/* Who to Follow Section */}
      <div className="mt-2">
        <div className="p-2 border rounded-lg bg-gray-100">
          <h1 className="font-bold mb-4">Who to follow</h1>
          {otherUsers?.map((user) => (
            <div
              key={user?._id}
              onClick={() => navigateProfile(user?._id)}
              className="flex flex-wrap w-full justify-between items-center mb-2"
            >
              <div className="flex items-center cursor-pointer">
                <Avatar
                  alt="profile pic"
                  src={user?.profilePic || "https://via.placeholder.com/150"} // Use a placeholder if no URL
                />
                <div className="ml-2">
                  <h1 className="font-bold text-sm">{user?.name}</h1>
                  <p className="text-gray-400 text-sm">{`@${user?.username}`}</p>
                </div>
              </div>
              <div className=" bg-black py-1 px-2 rounded-full text-sm text-white">
                <button>Profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
