import { createSlice } from "@reduxjs/toolkit";
const wishlist = createSlice({
  name: "wishlist",
  initialState: { items: [], wishlistCount: 0 },
  reducers: {
    toggleWishList: (state, action) => {
      const item = action.payload;
      const exists = state.items.find((i) => i.id === item.id);
      if (exists) {
        state.items = state.items.filter((i) => i.id !== item.id);
        state.wishlistCount -= 1;
      } else {
        state.items.push(item);
        state.wishlistCount += 1;
      }
    },
  },
});

export const { toggleWishList } = wishlist.actions;
export default wishlist;
