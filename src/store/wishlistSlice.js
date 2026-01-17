import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const removeFromWishlistServer = createAsyncThunk(
  "wishlist/remove",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("user");
      if (!token) return [];
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
      if (!token) return [];
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

export const getWishlistServer = createAsyncThunk(
  "wishlist/get",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("user");
      if (!token) return [];
      const res = await fetch(`${import.meta.env.VITE_API_URL}/shop/wishlist`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data.response.products || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const wishlist = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    wishlistCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    toggleWishList: (state, action) => {
      state.items = action.payload || [];
      state.wishlistCount = (action.payload || []).length;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeFromWishlistServer.fulfilled, (state, action) => {
      state.items = action.payload || [];
      state.loading = false;
      state.wishlistCount = action.payload.length;
    });
    builder
      .addCase(addToWishlistServer.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.loading = false;
        state.wishlistCount = (action.payload || []).length;
      })
      .addCase(getWishlistServer.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("wishlist/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("wishlist/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export const { toggleWishList } = wishlist.actions;
export default wishlist;
