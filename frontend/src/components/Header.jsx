import React, { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { IoMenuOutline } from "react-icons/io5";
import { PiUserCircleLight } from "react-icons/pi";
import LeftSidebar from "./LeftSidebar";
import { CiUser } from "react-icons/ci";
function Header() {
  const [menu, setMenu] = useState(false);
  console.log("menu:" + menu);
  return (
    <div className="flex justify-between w-full px-10 sm:hidden">
      <div onClick={() => setMenu(!menu)}>
        <IoMenuOutline size={"30px"} />
      </div>
      <div>
        <FaXTwitter size={"30px"} />
      </div>
      <div>
        <CiUser size={"30px"} />
      </div>
      {/* <LeftSidebar /> */}
      {menu ? <LeftSidebar className=" block"/> : null}
    </div>
  );
}

export default Header;
