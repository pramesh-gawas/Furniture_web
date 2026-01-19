import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem("user");
const getSavedUser = () => {
  try {
    const data = localStorage.getItem("user_data");
    return data ? JSON.parse(data) : null;
  } catch (err) {
    return null;
  }
};

const userData = createSlice({
  name: "auth",
  initialState: {
    user: getSavedUser(),
    token: savedToken || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      const cleanUser = user?.user ? user.user : user;
      state.user = cleanUser;
      state.token = token;
      localStorage.setItem("user", token);
      localStorage.setItem("user_data", JSON.stringify(cleanUser));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("user_data");
    },
  },
});

export const { setCredentials, logout } = userData.actions;
export default userData;
