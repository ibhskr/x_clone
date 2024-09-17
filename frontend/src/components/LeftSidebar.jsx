import React from "react";
import { GrHomeRounded } from "react-icons/gr";
import { IoIosSearch } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUsers, getOtherUser, getMyProfile } from "../redux/userSlice";

function LeftSidebar({ className }) {
  const { user } = useSelector((store) => store.user);
  useGetProfile(user?._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`USER_API_END_POINT/logout`);
      toast.success(res.data.message);
      console.log(res);
      dispatch(getUsers(null));
      // user: null,
      dispatch(getOtherUser(null));
      dispatch(getMyProfile(null));
      navigate("/register");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={` w-[80%]  sm:block ${className} hidden `}>
      <div>
        <div>
          <img
            className="ml-4"
            width={"24px"}
            src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?w=740&t=st=1713281363~exp=1713281963~hmac=11286b606c7cb48014cdd57c274324115d0f1b5c52e523798567849f4eca9230"
            alt="x"
            srcset=""
          />
        </div>
        <div className="my-4">
          <Link
            to="/"
            className="flex my-6  hover:bg-gray-300 rounded-xl items-center"
          >
            <GrHomeRounded size={"24px"} />
            <h2 className="mx-2 font-bold text-lg">Home</h2>
          </Link>

          <Link className="flex my-6 hover:bg-gray-300 rounded-xl items-center">
            <IoIosSearch size={"24px"} />
            <h2 className="mx-2 font-bold text-lg">Explore</h2>
          </Link>

          <Link className="flex my-6  hover:bg-gray-300 rounded-xl items-center">
            <IoNotificationsOutline size={"24px"} />
            <h2 className="mx-2 font-bold text-lg">Notification</h2>
          </Link>
          <Link
            to={`/profile/${user?._id}`}
            className="flex my-6  hover:bg-gray-300 rounded-xl items-center"
          >
            <CiUser size={"24px"} />
            <h2 className="mx-2 font-bold text-lg">Profile</h2>
          </Link>
          <Link className="flex my-6  hover:bg-gray-300 rounded-xl items-center">
            <CiBookmark size={"24px"} />
            <h2 className="mx-2 font-bold text-lg">Bookmarks</h2>
          </Link>
          <Link
            onClick={() => logoutHandler()}
            className="flex my-6  hover:bg-gray-300 rounded-xl items-center"
          >
            <AiOutlineLogout size={"24px"} />
            <h2 className="mx-2 font-bold text-lg">Logout</h2>
          </Link>
          <button className="px-4 py-4 bg-blue-500 rounded-full w-full font-bold">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
