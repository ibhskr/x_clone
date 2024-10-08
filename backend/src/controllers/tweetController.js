import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";

//-- create tweet
export const createTweet = async (req, res) => {
  try {
    const { description, id } = req.body;
    if (!description || !id) {
      return res.status(401).json({
        message: "Fields are required.",
        success: "false",
      });
    }
    const user = await User.findById(id).select("-password");
    const tweet = await Tweet.create({
      description,
      userId: id,
      // userDetails: user,
    });
    // Add tweet ID to user's tweet list
    user.tweets.push(tweet._id);
    await user.save();

    return res.status(201).json({
      message: "Tweet post Successfully",
      success: "true",
    });
  } catch (error) {}
};

//-- delete tweet

export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Tweet deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//-- like dislike
export const likeOrDislike = async (req, res) => {
  try {
    const loggedinUserId = req.body.id;
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found",
      });
    }

    if (tweet.like.includes(loggedinUserId)) {
      // Dislike
      await Tweet.findByIdAndUpdate(
        tweetId,
        { $pull: { like: loggedinUserId } },
        { new: true }
      );
      return res.status(200).json({
        message: "Dislike done",
      });
    } else {
      // Like
      await Tweet.findByIdAndUpdate(
        tweetId,
        { $push: { like: loggedinUserId } },
        { new: true }
      );
      return res.status(200).json({
        message: "Like done",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred",
    });
  }
};

// -- get all tweet
export const getAllTweet = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedinUser = await User.findById(id);
    const loggedinUserTweet = await Tweet.find({ userId: id }).populate("userId");
    const followingUserTweet = await Promise.all(
      loggedinUser?.following?.map((othertUserId) => {
        return Tweet.find({ userId: othertUserId }).populate("userId");
      })
    );
    return res.status(200).json({
      tweet: loggedinUserTweet.concat(...followingUserTweet),
    });
  } catch (error) {
    console.error(error);
  }
};

//-- get following tweet only

export const getFollowingTweet = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedinUser = await User.findById(id);
    // const loggedinUserTweet = await Tweet.find({ userId: id });
    const followingUserTweet = await Promise.all(
      loggedinUser.following.map((othertUserId) => {
        return Tweet.find({ userId: othertUserId }).populate("userId");
      })
    );
    return res.status(200).json({
      tweet: [].concat(...followingUserTweet),
    });
  } catch (error) {
    console.error(error);
  }
};
// -- get one user tweet
export const getUserTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    const UserTweets = await Tweet.find({ userId: id }).populate("userId");
    // const tweet = loggedinUserTweet.concat(user);

    return res.status(200).json(UserTweets);
  } catch (error) {
    console.error(error);
  }
};
