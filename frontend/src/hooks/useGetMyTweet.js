import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweet } from "../redux/tweetSlice";

const useGetMyTweet = (id) => {
  const dispatch = useDispatch();
  const { refresh, forYou } = useSelector((store) => store.tweet);

  // Fetch all tweets
  const fetchMyTweet = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`);

      dispatch(getAllTweet(res.data.tweet));
    } catch (error) {
      console.error(
        "Error fetching tweets:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Fetch following tweets only
  const fetchFollowingTweetsOnly = async () => {
    try {
      axios.defaults.withCredentials = true;
      // console.log('Axios Configuration:', axios.defaults);

      const res = await axios.get(
        `${TWEET_API_END_POINT}/followingtweet/${id}`
      );
      // console.log(res);
      dispatch(getAllTweet(res.data.tweet));
    } catch (error) {
      console.error(
        "Error fetching following tweets:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    if (!id) {
      console.error("User ID is undefined or null");
      return;
    }

    if (forYou) {
      fetchMyTweet();
    } else {
      fetchFollowingTweetsOnly();
    }
  }, [id, dispatch, refresh, forYou]);

  // Return any state or functions if needed
};

export default useGetMyTweet;
