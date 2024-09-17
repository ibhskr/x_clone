import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweet, getForYou, getRefresh } from "../redux/tweetSlice";
import { getRefreshUser } from "../redux/userSlice";

function CreatePost() {
  const [description, setDescription] = useState("");
  const { user } = useSelector((store) => store.user);
  // console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("refresh");
    dispatch(getRefreshUser());
  }, []);

  const submitHandler = async (e) => {
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, id: user?._id },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
      setDescription("");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  //--

  return (
    <div className="p-2 border w-full">
      <div>
        <div className="w-full flex items-center">
          <div>
            <Avatar alt="profile pic" src={user?.profilePic} />
          </div>
          <div className="flex flex-col w-full p-2">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is happening?!"
              className="w-full p-2 outline-none text-lg"
            />
            <div className="flex justify-between items-center p-2">
              <div>
                <CiImageOn size="20px" />
              </div>
              <button
                onClick={submitHandler}
                className="px-4 py-1 bg-blue-500 rounded-full w-fit text-sm font-bold"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
