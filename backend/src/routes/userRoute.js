import express from "express";
import {
  Login,
  Register,
  bookmark,
  follow,
  getMyProfile,
  getOtherUser,
  logout,
  unfollow,
} from "../controllers/userControllers.js";
import { isAuth } from "../config/auth.js";
const router = express.Router();

//--
router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(logout);
router.route("/bookmark/:id").put(isAuth, bookmark);
router.route("/profile/:id").get(isAuth, getMyProfile);
router.route("/otherusers/:id").get(isAuth, getOtherUser);
router.route("/follow/:id").post(isAuth, follow);
router.route("/unfollow/:id").post(isAuth, unfollow);
///-
export default router;
