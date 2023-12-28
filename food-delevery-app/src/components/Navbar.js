import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
import Cart from "../pages/Cart";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();

  // const cartItems = JSON.parse(localStorage.getItem("cartItems"));

  const cartItems = useSelector((state) => state.cart);

  const [cartView, setCartView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </ul>

            {localStorage.getItem("token") ? (
              <>
                <button
                  type="button"
                  className="btn bg-white text-success mx-2 position-relative"
                  onClick={() => {
                    setCartView(true);
                  }}
                >
                  My Cart
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems ? cartItems.length : 0}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </button>

                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart></Cart>
                  </Modal>
                ) : null}

                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </>
            ) : (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>

                <Link className="btn bg-white text-success mx-1" to="/signup">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
