import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");

const userData = createSlice({
  name: "auth",
  initialState: {
    user: savedUser || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem("user", token);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout, setUser } = userData.actions;
export default userData;
