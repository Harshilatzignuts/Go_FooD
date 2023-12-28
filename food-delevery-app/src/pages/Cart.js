import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { drop, remove } from "../store/CartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const cartItems = useSelector((state) => state.cart);

  let totalPrice = cartItems.reduce((price, item) => price + item.price, 0);

  const handleCheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");

    let response = await fetch("http://localhost:5000/api/OrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: cartItems,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    let data = await response.json();

    if (data.success === true) {
      dispatch(drop());
      navigate("/myOrder");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container m-auto mt-5 fs-1 text-white text-center">
        Cart is empty
      </div>
    );
  } else {
    return (
      <div>
        <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
          <table className="table table-hover ">
            <thead className=" text-success fs-4">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Option</th>
                <th scope="col">Amount</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((food, index) => (
                <tr key={food._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn p-0"
                      onClick={() => {
                        dispatch(remove({ id: food.id }));
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h1 className="fs-2 text-success">Total Price: {totalPrice}/-</h1>
          </div>
          <div>
            <button className="btn bg-success mt-5 " onClick={handleCheckout}>
              Check Out
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Cart;
