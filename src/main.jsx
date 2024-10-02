import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./homepage/HomePage.jsx";
import { Orders } from "./pages/Orders.jsx";
import { Products } from "./pages/Products.jsx";
import { Customers } from "./pages/Customers.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage></HomePage> },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/customers",
        element: <Customers></Customers>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}> </RouterProvider>
  </StrictMode>
);
