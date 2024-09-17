import { createSlice } from "@reduxjs/toolkit";
// import Profile from "../components/Profile";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    otherUsers: null,
    profile: null,
    refresh: false,
  },
  reducers: {
    //multiple actions
    getUsers: (state, action) => {
      state.user = action.payload;
    },
    getOtherUser: (state, action) => {
      state.otherUsers = action.payload;
    },
    getMyProfile: (state, action) => {
      state.profile = action.payload;
    },
    getRefreshUser: (state) => {
      state.refresh = !state.refresh;
    },
    followingUpdate: (state, action) => {
      if (state.user.following.includes(action.payload)) {
        state.user.following = state.user.following.filter((itemId) => {
          return itemId !== action.payload;
        });
      } else {
        state.user.following.push(action.payload);
      }
    },
  },
});
export const {
  getUsers,
  getOtherUser,
  getMyProfile,
  followingUpdate,
  getRefreshUser,
} = userSlice.actions;
export default userSlice.reducer;
