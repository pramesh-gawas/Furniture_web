import { Link } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { AiFillCustomerService } from "react-icons/ai";
import style from "../components/sidebar.module.css";
export const SideBar = () => {
  return (
    <>
      <div class={style.sidebar} style={{ width: "8%" }}>
        <a href="/" class="link-body-emphasis text-decoration-none">
          <div class=" homeLink d-flex justify-content-center fs-4">PG</div>
        </a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <Link
              to="/"
              class="nav-link link-body-emphasis "
              aria-current="page"
            >
              <svg class="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#home"></use>
              </svg>
              <FaHouse />
            </Link>
          </li>

          <li>
            <Link to="/products" class="nav-link link-body-emphasis">
              <svg class="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#grid"></use>
              </svg>
              <AiFillProduct></AiFillProduct>
            </Link>
          </li>
          <li>
            <Link to="/customers" class="nav-link link-body-emphasis">
              <svg class="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#people-circle"></use>
              </svg>
              <AiFillCustomerService></AiFillCustomerService>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
