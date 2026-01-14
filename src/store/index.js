import { configureStore } from "@reduxjs/toolkit";
import cart from "./cartSlice";
import product from "./productSlice";
import wishlist from "./wishlistSlice";
import userData from "./userSlice";
const Store = configureStore({
  reducer: {
    cart: cart.reducer,
    product: product.reducer,
    wishlist: wishlist.reducer,
    auth: userData.reducer,
  },
});
export default Store;
