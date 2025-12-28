import { createSlice } from "@reduxjs/toolkit";

const product = createSlice({
  name: "product",
  initialState: {
    items: [
      {
        id: 1,
        name: "Minimalist Living Room",
        description: "Discover our new Scandinavian collection for 2025.",
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1920",
        price: 400,
        totalPrice: "455",
        quantity: 2,
      },
      {
        id: 2,
        name: "Modern Office Spaces",
        description: "Ergonomic designs to boost your home productivity.",
        image:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1920",
        cta: "View Desks",
        price: 500,
        totalPrice: "7600",
        quantity: 2,
      },
      {
        id: 3,
        name: "Sustainable Bedroom",
        description: "Ethically sourced oak and linen for a better sleep.",
        image:
          "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1920",
        cta: "Shop Dining",
        price: 700,
        totalPrice: "7600",
        quantity: 2,
      },
      {
        id: 4,
        name: "Leather Sofa",
        price: "899",
        image: "images/bedroom-min.jpg",
        totalPrice: "12600",
        quantity: 2,
      },
    ],
    filteredItems: [],
    loadingStatus: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
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
} = product.actions;
export default product;
