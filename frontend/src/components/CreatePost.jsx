import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweet, getForYou, getRefresh } from "../redux/tweetSlice";

function CreatePost() {
  const [description, setDescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const { forYou } = useSelector((store) => store.tweet);

  const dispatch = useDispatch();
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
  const forYouOnly = () => {
    dispatch(getForYou(true));
  };
  const FollowingTweet = () => {
    dispatch(getForYou(false));
  };
  return (
    <div className="p-2 border">
      <div className="flex justify-evenly text-gray-700 border py-4 m-1">
        <div
          onClick={() => forYouOnly()}
          className={`${
            forYou ? "border-b-4 " : null
          } border-blue-600 hover:cursor-pointer`}
        >
          <h1>For You</h1>
        </div>
        <div
          className={`${
            !forYou ? "border-b-4" : null
          } border-blue-600 hover:cursor-pointer`}
          onClick={() => FollowingTweet()}
        >
          <h1>Following</h1>
        </div>
      </div>
      <div>
        <div className=" flex items-center">
          <div>
            <Avatar
              alt="profile pic"
              src="https://media.wired.com/photos/650399af65d83ff288720473/master/w_1920,c_limit/If-Elon-Musk-Had-Been-a-Happy-Child,-Would-He-Still-Be-Launching-Rockets--Business-Redux-h_16082330.jpg"
            />
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
