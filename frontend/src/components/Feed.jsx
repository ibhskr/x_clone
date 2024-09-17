import React from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";
import { useSelector } from "react-redux";
import SelectPreference from "./SelectPreference";

function Feed() {
  const { tweet } = useSelector((store) => store.tweet);
  console.log(tweet);
  return (
    <div className=" w-full  relative sm:m-2">
      <SelectPreference/>
      <CreatePost />
      {tweet?.map((tweet) => (
        <Tweet key={tweet?._id} tweet={tweet} className=" overflow-x-scroll"/>
      ))}
    </div>
  );
}

export default Feed;
