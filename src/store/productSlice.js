import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_API_URL;

export const getProductsServer = createAsyncThunk(
  "product/getProductsServer",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, sort = "", category = "all" } = params;
      const url = new URL(`${apiUrl}/shop/productlist`);
      url.searchParams.append("page", page);
      if (sort) url.searchParams.append("sort", sort);
      if (category) url.searchParams.append("category", category);

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch products");
      }

      const data = await response.json();
      return data.response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const product = createSlice({
  name: "product",
  initialState: {
    items: [],
    filteredItems: [],
    loadingStatus: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    appendProducts: (state, action) => {
      const newItems = action.payload.filter(
        (newItem) => !state.items.find((oldItem) => oldItem._id === newItem._id)
      );
      state.items = [...state.items, ...newItems];
      state.filteredItems = [...state.filteredItems, ...newItems];
    },
    filterByCategory: (state, action) => {
      const category = action.payload;
      if (category === "all") {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(
          (item) => item.category === category
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsServer.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getProductsServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setProducts,
  filterByCategory,
  sortByPrice,
  setLoading,
  setError,
  appendProducts,
} = product.actions;
export default product;
