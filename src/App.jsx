import "./App.css";
import { Outlet } from "react-router-dom";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
function App() {
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
