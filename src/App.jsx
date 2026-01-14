import "./App.css";
import { Outlet } from "react-router-dom";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { useDispatch } from "react-redux";
import { useFetch } from "./utils/useFetch";
import { toggleWishList } from "./store/wishlistSlice";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("user");
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data } = useFetch(`${apiUrl}/shop/wishlist`, "GET", null, token);

  useEffect(() => {
    if (data?.response?.products) {
      dispatch(toggleWishList(data.response.products));
    }
  }, [data, dispatch]);
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
