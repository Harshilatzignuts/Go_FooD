import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import "./Pages.css";
const Home = () => {
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    const url = "http://localhost:5000/api/foodData";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    setFoodItems(data[0]);

    setFoodCategory(data[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="banner">
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ width: "500px" }}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pizza"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?Aaloo"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCategory != [] ? (
          foodCategory.map((item) => {
            return (
              <div className="row mb-3">
                <div key={item._id} className="fs-3 m-3">
                  {item.CategoryName}
                </div>
                <hr />
                {foodItems != [] ? (
                  foodItems
                    .filter(
                      (foodItem) =>
                        foodItem.CategoryName === item.CategoryName &&
                        foodItem.name
                          .toLocaleLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((foodItem) => {
                      return (
                        <div
                          key={foodItem._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={foodItem}
                            foodName={foodItem.name}
                            options={foodItem.options[0]}
                            imgSrc={foodItem.img}
                            price={foodItem.price}
                          />
                        </div>
                      );
                    })
                ) : (
                  <>
                    <div className="text-center">No Data Found</div>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <>
            <div className="text-center">No Data Found</div>
          </>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
