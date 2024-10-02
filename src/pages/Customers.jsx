import React from "react";
import { IoLogoLinkedin } from "react-icons/io";
import { Footer } from "../components/Footer";
import { Contact } from "../components/Contact";

export const Customers = () => {
  return (
    <>
      <div class="container chat-container">
        <div class="row">
          <div class="col-md-12">
            <div class="chat-header">
              <h4>Contact Us</h4>
              <b>
                <a href="https://app.droxy.ai/guest-agent/66fd7a2d8acaa430a44c8730">
                  Viper: Hello there! How can I help you today? Feel free to ask
                  me anything.
                </a>
              </b>
            </div>
            <div>
              <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-9and+0n0MiW2ym/k6u06g66w+0W2F587+7u20965+Q85fHa+5a8aE/t94u3O2d6jP4"
                crossorigin="anonymous"
              />

              <div class="social-media-buttons">
                <a
                  href="https://www.linkedin.com/in/pramesh-gawas-9470a7190/"
                  target="_blank"
                >
                  <i class="bi bi-linkedin">
                    <IoLogoLinkedin
                      style={{ width: "100px", height: "100px" }}
                    ></IoLogoLinkedin>
                  </i>
                  hii i am Pramesh gawas
                </a>
              </div>
            </div>
          </div>
        </div>
        <Contact></Contact>
        <Footer></Footer>
      </div>
    </>
  );
};
