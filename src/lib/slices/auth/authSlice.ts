import { createSlice } from "@reduxjs/toolkit";

// setting up the initial state
const initialState = {
  userInfo:
    typeof window !== "undefined" && localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo") || "{}")
      : null,
};

// creating the authentication slice and reducer functions
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // storing the user in local storage
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
