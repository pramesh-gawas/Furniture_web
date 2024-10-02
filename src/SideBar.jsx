import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { IoBagHandleSharp } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { AiFillCustomerService } from "react-icons/ai";
export const SideBar = () => {
  return (
    <div
      class="d-flex flex-column flex-shrink-0 p-3"
      style={{ width: "100px" }}
    >
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <svg class="bi pe-none me-2" width="20" height="20">
          <use xlink:href="#bootstrap"></use>
        </svg>
        <span class="fs-4">PG</span>
      </a>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <Link to="/" class="nav-link link-body-emphasis " aria-current="page">
            <svg class="bi pe-none me-2" width="20" height="20">
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
  );
};
