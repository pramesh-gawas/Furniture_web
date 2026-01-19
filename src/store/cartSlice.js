import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const clearCartServer = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("user");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/shop/cart/clearCart`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      return data.response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

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
  },
);

const calculateTotals = (state) => {
  state.totalQuantity = state.items.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  state.totalAmount = state.items.reduce((acc, item) => {
    const price = item.price || item.product?.price || 0;
    return acc + price * item.quantity;
  }, 0);
};

const cart = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartServer.fulfilled, (state, action) => {
        const incomingItems = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.items || [];
        state.items = incomingItems;
        calculateTotals(state);
        state.loading = false;
      })
      .addCase(getCartServer.fulfilled, (state, action) => {
        state.items = action.payload;
        calculateTotals(state);
        state.loading = false;
      });
    builder
      .addCase(updateQuantityServer.fulfilled, (state, action) => {
        state.items = action.payload;
        calculateTotals(state);
        state.loading = false;
      })
      .addCase(removeFromCartServer.fulfilled, (state, action) => {
        state.items = action.payload;
        calculateTotals(state);
        state.loading = false;
      })
      .addCase(clearCartServer.fulfilled, (state) => {
        state.items = [];
        state.totalQuantity = 0;
        state.totalAmount = 0;
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

export const selectCartSubtotal = (state) => state.cart.totalAmount;

export const selectCartTax = (state) => {
  const subtotal = state.cart.totalAmount;
  return subtotal * 0.1;
};

export const selectCartTotal = (state) => {
  const subtotal = state.cart.totalAmount;
  const tax = subtotal * 0.1;
  return subtotal + tax;
};

export default cart;
