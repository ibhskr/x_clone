import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUsers } from "../redux/userSlice";
//--
//-- function register and login'
//--
function Register() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSingup, setShowSignup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //--- create new account logic
  const createNewAccount = async (e) => {
    e.preventDefault();
    console.table([name, email, username, password]);
    if (!name || !email || !username || !password) {
      toast.error("All fields are required");
      return;
    }
    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, {
        name,
        email,
        username,
        password,
      });
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        setShowSignup(false);
        setShowLogin(true);
      }
      setName("");
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };

  //-- login logic
  const loginAccount = async (e) => {
    // console.table([email, password]);
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, {
        email,
        password,
      });
      // console.log("res.cookie:" + res.cookie);
      // console.log("only res:" + res);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
      setEmail("");
      setPassword("");

      dispatch(getUsers(res?.data?.user));
    } catch (error) {
      toast.success(error.response.data.message);
      // console.log(error);
    }
  };
  return (
    <>
      <div className=" bg-black w-screen h-screen text-white flex-col sm:flex sm:flex-row  sm:items-center sm:justify-center ">
        <div className="sm:w-1/2 ">
          <div className="flex justify-center items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/X_logo_2023_%28white%29.png/900px-X_logo_2023_%28white%29.png"
              alt=""
              className=" h-[50px] sm:h-[100px] md:h-[200px]  "
            />
          </div>
        </div>
        <div className="sm:w-1/2">
          <div className="text-center sm:text-left">
            <h1 className=" font-bold text-2xl sm:text-6xl">Happening now</h1>
            <h1 className=" font-bold  sm:text-4xl sm:mt-16 sm:mb-8">
              Join today.
            </h1>
          </div>
          <div className=" font-sans">
            <div className=" w-4/5 m-auto sm:m-0 mt-10 sm:w-max ">
              <button className=" w-full bg-white text-black rounded-full p-2 my-2  flex items-center justify-center">
                <FcGoogle size="20px" className="mx-2" />
                Signup with Google
              </button>

              <button className=" w-full bg-white text-black rounded-full p-2 my-2 flex items-center justify-center">
                <FaApple size="20px" className="mx-2" />
                Singup with Apple
              </button>

              <button
                onClick={() => setShowSignup(true)}
                className="w-full  bg-blue-400 text-black rounded-full p-2 my-2 text-center"
              >
                Create account
              </button>

              <p className=" text-sm text-gray-600 m-2">
                By signing up, you agree to the Terms of
                <br /> Service and Privacy Policy, including Cookie Use.
              </p>
              <h3 className="mt-10 text-base m-2">Already have an account?</h3>
              <button
                onClick={() => setShowLogin(true)}
                className="w-full border border-blue-400  text-white rounded-full p-2 my-2 text-center"
              >
                SignIn
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={showLogin ? "visible absolute top-0" : "hidden"}>
        {/* ------
        --------- login flot window ------
        -------- */}
        <div className="w-screen h-screen flex justify-center items-center relative bg-opacity-50 bg-gray-600">
          <div className=" w-fit sm:w-2/5  bg-black text-white  rounded-lg z-10">
            <div
              onClick={() => setShowLogin(false)}
              className=" text-white hover:bg-slate-800 hover:cursor-pointer rounded-full mb-4 w-fit"
            >
              <IoMdClose size="24px" />
            </div>
            <div className="flex justify-center">
              <div className=" w-1/2  ">
                <h1 className=" font-bold text-lg py-4">Sing in to X</h1>
                <div>
                  <button className=" w-full bg-white text-black rounded-full p-2 my-4  flex items-center justify-center">
                    <FcGoogle size="20px" className="mx-2" />
                    Signup with Google
                  </button>

                  <button className=" w-full bg-white text-black rounded-full p-2 my-4 flex items-center justify-center">
                    <FaApple size="20px" className="mx-2" />
                    Singup with Apple
                  </button>
                </div>
                <Divider>or</Divider>
                <form
                  action=""
                  className="flex flex-col mt-4"
                  onSubmit={loginAccount}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="bg-transparent text-white placeholder-white border-b-2 border-white mb-4 outline-none"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="******"
                    className="bg-transparent text-white placeholder-white border-b-2 border-white mb-4 outline-none"
                  />
                  <button className="bg-white text-black py-2 rounded-lg mb-20">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={showSingup ? "visible absolute top-0" : "hidden"}>
        {/* ---
        ------ Create account flot window ----
        ---- */}

        <div className="w-screen h-screen flex justify-center items-center relative bg-opacity-50 bg-gray-600">
          <div className=" w-fit sm:w-2/5  bg-black text-white  rounded-lg z-10">
            <div
              onClick={() => setShowSignup(false)}
              className=" text-white hover:bg-slate-800 hover:cursor-pointer rounded-full mb-4 w-fit"
            >
              <IoMdClose size="24px" />
            </div>
            <div className="flex justify-center">
              <div className=" w-1/2  ">
                <h1 className=" font-bold text-lg py-4">SingUp to X</h1>

                {/* input field */}
                <form
                  action=""
                  className="flex flex-col mt-4"
                  onSubmit={createNewAccount}
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent  placeholder-white border-b-2 border-white mb-4 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    name=""
                    id=""
                    className="bg-transparent border-b-2 border-white mb-4 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent  placeholder-white border-b-2 border-white mb-4 outline-none"
                  />
                  <input
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent placeholder-white border-b-2 border-white mb-4 outline-none"
                  />
                  {/* <input type="submit" value="" /> */}
                  <button
                    type="submit"
                    className="bg-white text-black py-2 rounded-lg mb-20"
                  >
                    SignUp
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
