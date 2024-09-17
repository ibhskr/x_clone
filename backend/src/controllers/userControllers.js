import { User } from "../models/userSchema.js";
import { Tweet } from "../models/tweetSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
process.loadEnvFile();

// import { JsonWebTokenError } from "jsonwebtoken";
//-- register
export const Register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(401).json({
        message: "all fields are required.",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "user already exist",
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      username,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

//-- login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User does not exist",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password or email",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });
    // console.log(res.cookie);
    return res.status(200).json({
      message: `Welcome back ${user.name}`,
      user,
      success: true,
    });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

//-- logout
export const logout = (req, res) => {
  return res
    .cookie("token", "", {
      expires: new Date(Date.now()), // Corrected from 'expiresIn' to 'expires'
      httpOnly: true, // Optional: Ensure the cookie is not accessible via client-side scripts
    })
    .json({
      message: "User logged out successfully",
      success: true,
    });
};

//-- bookmark
export const bookmark = async (req, res) => {
  try {
    const loggedinUserId = req.body.id;
    const tweetId = req.params.id;
    const user = await User.findById(loggedinUserId);
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found",
      });
    }

    if (user.bookmarks.includes(tweetId)) {
      // remove
      await User.findByIdAndUpdate(loggedinUserId, {
        $pull: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "removed from bookmark",
        success: true,
      });
    } else {
      // add
      await User.findByIdAndUpdate(loggedinUserId, {
        $push: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "saved to bookmark",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred",
    });
  }
};

//-- get my profile
export const getMyProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
// -- get other users
export const getOtherUser = async (req, res) => {
  try {
    const { id } = req.params;

    const otherUser = await User.find({ _id: { $ne: id } }).select("-password");
    // console.log(otherUser);
    if (!otherUser) {
      return res.status(401).json({
        message: "Currently do not have any user",
      });
    }
    return res.status(200).json({
      otherUser,
    });
  } catch (error) {
    return res.status(401).json({
      message: "failed to fetch the data",
    });
  }
};

export const follow = async (req, res) => {
  try {
    const loggedinUserId = req.body.id;
    const userId = req.params.id;
    const loggedinUser = await User.findById(loggedinUserId);
    const user = await User.findById(userId);
    if (!user.followers.includes(loggedinUserId)) {
      await user.updateOne({ $push: { followers: loggedinUserId } });
      await loggedinUser.updateOne({ $push: { following: userId } });
    } else {
      res.status(400).json({
        message: `user already followed to ${user.name}`,
      });
    }
    return res.status(200).json({
      message: `${loggedinUser.name} just follow to ${user.name}`,
    });
  } catch (error) {
    console.log(error);
  }
};

//-- unfollow

export const unfollow = async (req, res) => {
  try {
    const loggedinUserId = req.body.id;
    const userId = req.params.id;
    const loggedinUser = await User.findById(loggedinUserId);
    const user = await User.findById(userId);
    if (user.followers.includes(loggedinUserId)) {
      await user.updateOne({ $pull: { followers: loggedinUserId } });
      await loggedinUser.updateOne({ $pull: { following: userId } });
    } else {
      res.status(400).json({
        message: `user has not follow ${user.name}`,
      });
    }
    return res.status(200).json({
      message: `${loggedinUser.name} just unfollow to ${user.name}`,
    });
  } catch (error) {
    console.log(error);
  }
};
