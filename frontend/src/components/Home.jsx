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
      <div className="w-full grid grid-cols-4 justify-items-center">
        <LeftSidebar />
        {/* <Feed/> */}
        <div className="w-full col-span-2">
          <Outlet />
        </div>

        <RightSidebar otherUsers={otherUsers} />
      </div>
    </div>
  );
}

export default Home;
