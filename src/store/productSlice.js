import { createSlice } from "@reduxjs/toolkit";

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
    sortByPrice: (state, action) => {
      const order = action.payload; // 'asc' or 'desc'
      state.filteredItems = [...state.filteredItems].sort((a, b) => {
        if (order === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    },
    setLoading: (state, action) => {
      state.loadingStatus = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
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
