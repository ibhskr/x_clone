import React, { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Feed from "./Feed";
import { Outlet, useNavigate } from "react-router-dom";
import useGetUser from "../hooks/useGetProfile";
import { useSelector } from "react-redux";
import useOtherUser from "../hooks/useOtherUsers";
import useGetMyTweet from "../hooks/useGetMyTweet";
import Header from "./Header";
function Home() {
  const { user, otherUsers } = useSelector((store) => store.user);
  const navigate = useNavigate();
  if (!user) {
    useEffect(() => {
      navigate("/register");
    }, []);
  }
  useOtherUser(user?._id);
  useGetMyTweet(user?._id);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex justify-between w-[80%] m-auto">
        <LeftSidebar />
        {/* <Feed/> */}
        <Outlet />
        <RightSidebar otherUsers={otherUsers} />
      </div>
    </div>
  );
}

export default Home;
