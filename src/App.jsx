import "./App.css";
import { SideBar } from "./components/SideBar";
import { Outlet } from "react-router-dom";
import { Spinner } from "./Spinner";
function App() {
  return (
    <>
      <div
        className=" main d-flex flex-col w-100 "
        style={{ position: "relative" }}
      >
        <SideBar></SideBar>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
