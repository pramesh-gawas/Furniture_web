import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCartServer = createAsyncThunk(
  "cart/get",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("user");
      if (!token) return [];

      const res = await fetch(`${import.meta.env.VITE_API_URL}/shop/cart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      const rawItems = data?.response?.items || [];
      return rawItems;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const addToCartServer = createAsyncThunk(
  "cart/add",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("user");
      if (!token) return [];
      const res = await fetch(`${import.meta.env.VITE_API_URL}/shop/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data.response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateQuantityServer = createAsyncThunk(
  "cart/update",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("user");
      if (!token) return [];

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/shop/cart/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, quantity }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not update quantity");
      return data.response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeFromCartServer = createAsyncThunk(
  "cart/remove",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("user");
      if (!token) return [];

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/shop/cart/remove/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to remove item");

      return data.response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const cart = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          _id: newItem._id,
          name: newItem.name,
          price: Number(newItem.price),
          quantity: 1,
          totalPrice: Number(newItem.price),
          images: newItem.images,
          description: newItem.description,
        });
      }
      state.totalQuantity++;
      state.totalAmount += newItem.price;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartServer.fulfilled, (state, action) => {
        const incomingItems = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.items || [];

        state.items = incomingItems;
        state.totalQuantity = incomingItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalAmount = incomingItems.reduce((total, item) => {
          const price = item.product?.price || 0;
          return total + price * item.quantity;
        }, 0);

        state.loading = false;
      })
      .addCase(getCartServer.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalQuantity = state.items.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        state.totalAmount = state.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        state.loading = false;
      });
    builder
      .addCase(updateQuantityServer.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalQuantity = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalAmount = state.items.reduce((total, item) => {
          const price = item.product?.price || 0;
          return total + price * item.quantity;
        }, 0);
      })
      .addCase(removeFromCartServer.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("cart/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("cart/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "An unexpected error occurred";
        }
      );
  },
});

export const { addItem, removeItem, clearCart, updateQuantity } = cart.actions;
export default cart;
