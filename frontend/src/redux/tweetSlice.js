import { createSlice } from "@reduxjs/toolkit";
const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweet: null,
    refresh: false,
    forYou: true,
  },
  reducers: {
    getAllTweet: (state, action) => {
      state.tweet = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    getForYou: (state, action) => {
      state.forYou = action.payload;
    },
  },
});
export const { getAllTweet, getRefresh, getForYou } = tweetSlice.actions;
export default tweetSlice.reducer;
