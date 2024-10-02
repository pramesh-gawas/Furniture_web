import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Contact } from "../components/Contact";
export const Products = () => {
  const [isloading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const url = "https://dummyjson.com/products/category/furniture";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const result = data.products;
        setData(result);
      } catch (error) {
        console.error("error fetching data", error);
      }
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <div class="album py-3 ">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {data.map((item) => (
            <div class="col" key={item.id}>
              <div class="card shadow-sm">
                <title>title</title>
                <rect width="100%" height="100%" fill="none">
                  <li style={{ listStyle: "none" }}>
                    {!isloading ? (
                      <p>loading.....</p>
                    ) : (
                      <img src={item.images[0]} alt={item.brand} />
                    )}
                  </li>
                </rect>
                <text x="50%" y="50%" fill="#eceeef" dy=".3em"></text>

                <div class="card-body">
                  <div class="d-grid justify-content-between align-items-center">
                    <div>brand:{item.brand}</div>
                    <div>rating:{item.rating}</div>
                    <div>price:{item.price}</div>
                    <div>category:{item.category}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  );
};
