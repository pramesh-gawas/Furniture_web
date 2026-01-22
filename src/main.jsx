import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage.jsx";
import { CheckOutPage } from "./components/pages/CheckOutPage.jsx";
import { Shop } from "./components/pages/Shop.jsx";
import { WishList } from "./components/pages/WishList.jsx";
import { OrderHistory } from "./components/pages/OrderHistory.jsx";
import { ProductDetail } from "./components/pages/ProductDetail.jsx";
import { SignInLogIn } from "./components/SignInLogIn.jsx";
import { Provider } from "react-redux";
import Store from "./store/index.js";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { OrderSuccess } from "./components/pages/OrderSuccess.jsx";
import { PageNotFound } from "./components/common/PageNotFound.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/shop", element: <Shop /> },
      { path: "/signIn", element: <SignInLogIn /> },
      { path: "/signUp", element: <SignInLogIn /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "*", element: <PageNotFound /> },

      // Protected Route
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/checkout", element: <CheckOutPage /> },
          { path: "/wish-list", element: <WishList /> },
          { path: "/order-history", element: <OrderHistory /> },
          { path: "/order-success", element: <OrderSuccess /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router}> </RouterProvider>
    </Provider>
  </StrictMode>,
);
