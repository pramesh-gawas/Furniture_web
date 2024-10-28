import React, { useState } from "react";
import style from "./HomePage.module.css";
import { Box1 } from "./Box1";
import { Footer } from "../components/Footer";
import { Contact } from "../components/Contact";
import { Spinner } from "../Spinner";
export const HomePage = () => {
  return (
    <div className={style.main}>
      <div className={style.section1}>
        <div className={style.first}>
          <div className={style.image}>
            <a href="">
              <img src="/images/living_2.jpg" alt="living_hall_image" />
            </a>
            <Box1></Box1>
          </div>
        </div>
        <div className={style.second}>
          <a href="">
            <img src="/images/bedroom-min.jpg" alt="bedroom_hall_image" />
          </a>
        </div>
      </div>
      <div className={style.section2}>
        <div className={style.first}>
          <a href="">
            <img src="/images/living_1-min.jpg" alt="living_hall_image" />
          </a>
        </div>
        <div className={style.second}>
          <a href="">
            <img src="/images/chair_2-min.jpg" alt="chair_image" />
          </a>
        </div>
        <div className={style.third}>
          <a href="">
            <img src="/images/chair.jpg" alt="chair_image" />
          </a>
        </div>
      </div>
      {/* living Room */}
      <hr />
      <div className="title">Living Room</div>
      <div class=" itemContainer  row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5 shadow-lg me-2 ">
        <div class="col">
          <div class="card card-cover h-100 overflow-hidden  rounded-4 shadow-lg">
            <a href="">
              <img src="/images/living_1-min.jpg" alt="furniture_image" />
            </a>
          </div>
        </div>

        <div class="col">
          <div class="card card-cover h-100 overflow-hidden  rounded-4 shadow-lg">
            <a href="">
              <img src="/images/living_hall.jpg" alt="living_furniture" />
            </a>
          </div>
        </div>

        <div class="col">
          <div class="card card-cover h-100 overflow-hidden  rounded-4 shadow-lg">
            <a href="">
              <img
                src="/images/living_hall_2.jpg"
                alt="living_hall_furniture"
              />
            </a>
          </div>
        </div>
      </div>
      {/* BedRoom */}
      <hr />
      <div className="title">Bedroom Room</div>
      <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5 shadow-lg me-2">
        <div class="col">
          <div class="card card-cover h-100 overflow-hidden  rounded-4 shadow-lg">
            <a href="">
              <img
                src="/images/bedroom_furniture.png"
                alt="bedroom_furniture"
              />
            </a>
          </div>
        </div>

        <div class="col">
          <div class="card card-cover h-100 overflow-hidden  rounded-4 shadow-lg">
            <a href="">
              <img src="/images/bedroom_furniture_2.png" alt="" />
            </a>
          </div>
        </div>

        <div class="col">
          <div class="card card-cover h-100 overflow-hidden  rounded-4 shadow-lg">
            <a href="">
              <img
                src="/images/bedroom_furniture_3.jpg"
                alt="bedroom_furniture"
              />
            </a>
          </div>
        </div>
      </div>
      {/* LivingRoom */}
      <hr />
      <div className="title">Dinning Room</div>
      <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5 shadow-lg me-2">
        <div class="col">
          <div class="card card-cover h-100 overflow-hidden  rounded-4 shadow-lg">
            <a href="">
              <img
                src="/images/dinning_furniture.jpg"
                alt="dinnign_furniture"
              />
            </a>
          </div>
        </div>

        <div class="col">
          <div class="card card-cover h-100 overflow-hidden  rounded-4 shadow-lg">
            <a href="">
              <img
                src="/images/dinning_hall_furniture_2.jpg"
                alt="dinnign_furniture"
              />
            </a>
          </div>
        </div>

        <div class="col">
          <div class="card card-cover h-100 overflow-hidden  rounded-4 shadow-lg">
            <a href="">
              <img
                src="/images/dinning_hall_furniture_3.jpg"
                alt="dinning_furniture"
              />
            </a>
          </div>
        </div>
      </div>
      <hr />
      {/* testimonial */}
      <h3 className="d-flex justify-content-center pb-5">Our Testimonial</h3>
      <div class="row">
        <div class="col-lg-4">
          <svg
            class="bd-placeholder-img rounded-circle"
            width="140"
            height="140"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect
              width="100%"
              height="100%"
              fill="var(--bs-secondary-color)"
            ></rect>
          </svg>
          <h2 class="fw-normal">Heading</h2>
          <p>
            And lastly this, the third column of representative placeholder
            content.
          </p>
        </div>
        <div class="col-lg-4">
          <svg
            class="bd-placeholder-img rounded-circle"
            width="140"
            height="140"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect
              width="100%"
              height="100%"
              fill="var(--bs-secondary-color)"
            ></rect>
          </svg>
          <h2 class="fw-normal">Heading</h2>
          <p>
            And lastly this, the third column of representative placeholder
            content.
          </p>
        </div>
        <div class="col-lg-4">
          <svg
            class="bd-placeholder-img rounded-circle"
            width="140"
            height="140"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect
              width="100%"
              height="100%"
              fill="var(--bs-secondary-color)"
            ></rect>
          </svg>
          <h2 class="fw-normal">Heading</h2>
          <p>
            And lastly this, the third column of representative placeholder
            content.
          </p>
        </div>
      </div>
      <hr />
      {/* end image */}
      <body class="d-flex  text-center ">
        <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
          <symbol id="check2" viewBox="0 0 16 16">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"></path>
          </symbol>
          <symbol id="circle-half" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path>
          </symbol>
          <symbol id="moon-stars-fill" viewBox="0 0 16 16">
            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path>
            <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"></path>
          </symbol>
          <symbol id="sun-fill" viewBox="0 0 16 16">
            <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"></path>
          </symbol>
        </svg>

        <div class="cover-container  w-100   mx-auto">
          <img src="/images/living-room2.jpg" alt="living_funiture_image" />
        </div>
      </body>
      <Contact></Contact>

      <Footer></Footer>
    </div>
  );
};
