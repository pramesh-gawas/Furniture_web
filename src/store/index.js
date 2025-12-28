import { configureStore } from "@reduxjs/toolkit";
import cart from "./cartSlice";
import product from "./productSlice";
import wishlist from "./wishlistSlice";
const Store = configureStore({
  reducer: {
    cart: cart.reducer,
    product: product.reducer,
    wishlist: wishlist.reducer,
  },
});
export default Store;
