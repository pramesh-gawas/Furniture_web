import React from "react";

export const Header = () => {
  return (
    <div class="container">
      <header class="d-flex justify-content-center py-3">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a href="#" class="nav-link active" aria-current="page">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              products
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              liked
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              bag
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              purchased
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
};
