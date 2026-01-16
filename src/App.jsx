import "./App.css";
import { Outlet } from "react-router-dom";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistServer } from "./store/wishlistSlice";
import { useEffect } from "react";
import { getCartServer } from "./store/cartSlice";
function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      dispatch(getCartServer());
      dispatch(getWishlistServer());
    }
  }, [dispatch, user]);
  return (
    <>
      <div className=" main d-flex flex-col">
        <Header />
        <Outlet></Outlet>
        <Footer />
      </div>
    </>
  );
}

export default App;
