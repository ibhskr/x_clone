import React from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";
import { useSelector } from "react-redux";

function Feed() {
  const { tweet } = useSelector((store) => store.tweet);
  // console.log(tweet);
  return (
    <div className=" w-full px-10 sm:m-2">
      <CreatePost />
      {tweet?.map((tweet) => (
        <Tweet key={tweet?._id} tweet={tweet} className=" overflow-x-scroll"/>
      ))}
    </div>
  );
}

export default Feed;
