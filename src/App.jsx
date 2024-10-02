import "./App.css";
import { SideBar } from "./SideBar";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <div className=" main d-flex flex-col">
        <SideBar></SideBar>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
