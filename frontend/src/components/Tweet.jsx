import React from "react";
import Avatar from "@mui/material/Avatar";
import { FaRegComment } from "react-icons/fa";
import { LiaRetweetSolid } from "react-icons/lia";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";

//---
function Tweet({ tweet }) {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  // console.log({tweet});
  const likeOrDislike = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );

      toast.success(res.data.message);

      dispatch(getRefresh());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteTweet = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
      console.log(res);
      toast.success.message;
      dispatch(getRefresh());
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex py-2 px-1 sm:px-10  border">
        <div>
          <Avatar
            alt="profile pic"
            src="https://media.wired.com/photos/650399af65d83ff288720473/master/w_1920,c_limit/If-Elon-Musk-Had-Been-a-Happy-Child,-Would-He-Still-Be-Launching-Rockets--Business-Redux-h_16082330.jpg"
          />
        </div>
        <div className="p-2 w-full">
          <div className="flex items-center">
            <h1 className="font-bold">{tweet.userDetails[0]?.name}</h1>
            <p className=" text-gray-500 text-sm ml-1">{`@${tweet.userDetails[0]?.username} - 1m`}</p>
          </div>
          <div>
            <p>{tweet.description}</p>
          </div>
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center hover:text-blue-400 cursor-pointer">
              <FaRegComment size="20px" />
              <p className="ml-1">0</p>
            </div>
            <div className="flex items-center hover:text-green-700 cursor-pointer">
              <LiaRetweetSolid size="20px" />
              <p className="ml-1">0</p>
            </div>
            {/* like dislike */}
            <div className="flex items-center hover:text-pink-600 cursor-pointer">
              <CiHeart size="20px" onClick={() => likeOrDislike(tweet?._id)} />
              <p className="ml-1">{tweet.like.length}</p>
            </div>
            <div className="flex items-center  hover:text-blue-400 cursor-pointer">
              <CiBookmark size="20px" />
              <p className="ml-1">0</p>
            </div>
            {user?._id === tweet?.userId && (
              <div className="flex items-center hover:text-red-600 cursor-pointer">
                <MdDelete
                  size="20px"
                  onClick={() => {
                    deleteTweet(tweet?._id);
                  }}
                />
                <p className="ml-1">0</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
