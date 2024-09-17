import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweet, getForYou, getRefresh } from "../redux/tweetSlice";
import Stack from "@mui/material/Stack";
function SelectPreference() {
  const dispatch = useDispatch();
  const { forYou } = useSelector((store) => store.tweet);
  const forYouOnly = () => {
    dispatch(getForYou(true));
  };
  const FollowingTweet = () => {
    dispatch(getForYou(false));
  };
  return (
    <div>
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
    </div>
  );
}

export default SelectPreference;
