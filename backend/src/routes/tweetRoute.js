import express from "express";
import { isAuth } from "../config/auth.js";
import {
  createTweet,
  deleteTweet,
  getAllTweet,
  getFollowingTweet,
  likeOrDislike,
} from "../controllers/tweetController.js";
//--
const router = express.Router();
//--
router.route("/create").post(isAuth, createTweet);
router.route("/delete/:id").delete(isAuth, deleteTweet);
router.route("/like/:id").put(isAuth, likeOrDislike);
router.route("/alltweets/:id").get(isAuth, getAllTweet);
router.route("/followingtweet/:id").get(isAuth, getFollowingTweet);
export default router;
