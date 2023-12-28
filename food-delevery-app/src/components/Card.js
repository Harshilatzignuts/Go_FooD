import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add, update } from "../store/CartSlice";
const Card = (props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const priceRef = useRef();

  const { foodName, imgSrc, options, foodItem } = props;

  const priceOptions = Object.keys(options);

  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);

  const state = useSelector((state) => state.cart);

  const token = localStorage.getItem("token");

  const handleAddtoCart = (foodItem) => {
    if (token !== null) {
      let food = state; // Assuming state is your Redux state

      // Find the food item in the state
      const existingFood = food.find((item) => item.id === foodItem._id);

      if (existingFood) {
        const updatedQty = parseInt(existingFood.qty, 10) + parseInt(qty, 10);

        if (existingFood.size === size) {
          dispatch(
            update({
              id: foodItem._id,
              price: finalPrice,
              qty: updatedQty,
            })
          );
          return;
        } else {
          dispatch(
            add({
              id: foodItem._id,
              img: imgSrc,
              name: foodName,
              price: finalPrice,
              qty: parseInt(qty, 10), // Use parsed qty here
              size: size,
            })
          );
          return;
        }
      }

      dispatch(
        add({
          id: foodItem._id,
          img: imgSrc,
          name: foodName,
          price: finalPrice,
          qty: parseInt(qty, 10), // Use parsed qty here
          size: size,
        })
      );
    } else {
      alert("Please login to add items to cart");
      navigate("/login");
    }
  };
  const finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  });

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem" }}>
        <img
          src={imgSrc}
          className="card-img-top w-100"
          alt={foodName}
          style={{ objectFit: "fill", height: "220px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodName}</h5>
          <div className="container w-100 d-flex align-items-center">
            <select
              className="m-2 h-100 bg-success text-white"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (x, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              className="m-2 h-100 bg-success text-white rounded"
              onChange={(e) => setSize(e.target.value)}
              ref={priceRef}
            >
              {priceOptions.map((data) => (
                <option value={data} key={data}>
                  {data}
                </option>
              ))}
            </select>

            <div className="d d-inline h-100 fs-5">
              <h5 className="my-1">₹{finalPrice}/-</h5>
            </div>
          </div>
          <hr></hr>
          <button
            className="btn btn-success justify-center ms-2"
            onClick={() => handleAddtoCart(foodItem)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
