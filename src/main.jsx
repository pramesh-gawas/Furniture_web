import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage.jsx";
import CheckOutPage from "./components/pages/CheckOutPage.jsx";
import ProductCatelog from "./components/pages/ProductCatelog.jsx";
import WishList from "./components/pages/WishList.jsx";
import OrderHistory from "./components/pages/OrderHistory.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/checkout",
        element: <CheckOutPage />,
      },
      {
        path: "/shop",
        element: <ProductCatelog />,
      },
      {
        path: "/wish-list",
        element: <WishList />,
      },
      {
        path: "/order-history",
        element: <OrderHistory />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}> </RouterProvider>
  </StrictMode>
);
