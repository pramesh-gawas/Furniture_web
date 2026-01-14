import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const removeFromWishlistServer = createAsyncThunk(
  "wishlist/remove",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("user");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/shop/wishlist/remove/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      return data.response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const addToWishlistServer = createAsyncThunk(
  "wishlist/add",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("user");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/shop/wishlist/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add");
      return data.response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const wishlist = createSlice({
  name: "wishlist",
  initialState: { items: [], wishlistCount: 0 },
  reducers: {
    toggleWishList: (state, action) => {
      state.items = action.payload || [];
      state.wishlistCount = (action.payload || []).length;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeFromWishlistServer.fulfilled, (state, action) => {
      state.items = action.payload;
      console.log(action.payload);
      state.wishlistCount = action.payload.length;
    });
  },
});

export const { toggleWishList } = wishlist.actions;
export default wishlist;
