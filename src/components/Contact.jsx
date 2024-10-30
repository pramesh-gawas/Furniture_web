import React from "react";

export const Contact = () => {
  const formSubmit = (e) => {
    e.reset();
  };

  return (
    <div class="row m-5">
      <div class="col-md-6 ">
        <img
          src="/images/living-room.jpg"
          alt="Contact Image"
          class="img-fluid"
        />
      </div>
      <div class="col-md-6">
        <h2>Contact Us</h2>
        <form
          action="https://formsubmit.co/6e065dafb05467fda1a20b8b302b39cd"
          method="POST"
          target="_blank"
        >
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              name="email"
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter  your email"
              required
            />
          </div>
          <div class="form-group">
            <label for="name">Your Name:</label>
            <input
              name="name"
              type="text"
              class="form-control"
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <a href="mailto:prameshgawas11@gmail.com">
            <button
              style={{ marginTop: "5px" }}
              type="submit"
              class="btn btn-primary"
              onSubmit={formSubmit}
            >
              submit
            </button>
          </a>
        </form>
      </div>
    </div>
  );
};
