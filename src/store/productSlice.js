import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchCategoryServer = createAsyncThunk(
  "product/fetchCategoryServer",
  async ({ page = 1, sort = "", category = "all" }, { rejectWithValue }) => {
    try {
      const url = `${apiUrl}/shop/productlist?page=${page}&sort=${sort}&category=${category}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch products from the server");
      }

      const data = await response.json();

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

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
  },
);

const product = createSlice({
  name: "product",
  initialState: {
    items: [],
    filteredItems: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {},
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
      })
      .addCase(fetchCategoryServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryServer.fulfilled, (state, action) => {
        state.loading = false;

        // Destructure the array (response) and the metadata from the payload
        const { response, totalPages, currentPage } = action.payload;

        if (currentPage === 1) {
          // FIX: Set items to the ARRAY, not the whole object
          state.items = response;
        } else {
          // Append logic for Load More
          state.items = [...state.items, ...response];
        }

        state.totalPages = totalPages;
        state.currentPage = currentPage;
      })
      .addCase(fetchCategoryServer.rejected, (state, action) => {
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
