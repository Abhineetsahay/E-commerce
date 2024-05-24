import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import Cartitem from "../Components/Cartitem";
import { useEffect, useState } from "react";
import useCartData from "../customhooks/useCartdata";

export default function Cart() {
  const { cartData, loading, error, isLoggedIn } = useCartData();
  const [totalAmount, setTotalAmount] = useState(0);
  
  useEffect(() => {
    if (Array.isArray(cartData.cart)) {
      setTotalAmount(cartData.cart.reduce((total, item) => total + item.price, 0));
    }
  }, [cartData]);

  const updateTotalAmount = (amount) => {
    setTotalAmount((prevAmount) => prevAmount + amount);
  };

  const decreaseTotalAmount = (amount) => {
    setTotalAmount((prevAmount) => prevAmount - amount);
  };

  if (!isLoggedIn) {
    return (
      <div className="not-logged-in">
        <h1 className="not-logged-in-heading">You are not logged in</h1>
        <Link to="/login" className="login-link">Login</Link>
      </div>
    );
  }

  if (loading) {
    return <div className="loading"><span className="loader1"></span></div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!Array.isArray(cartData.cart) || cartData.cart.length === 0) {
    return (
      <div className="length0">
        <h1 className="length0-heading">No item in your Cart</h1>
        <Link to="/" className="shop">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      {cartData.cart.map((cartItem) => (
        <Cartitem
          cartItem={cartItem}
          key={cartItem.id}
          updateTotalAmount={updateTotalAmount}
          decreaseTotalAmount={decreaseTotalAmount}
        />
      ))}
      <div className="totalamountandorder">
        <div className="totalamount-order">
          <p className="totalamount">Total amount: ${totalAmount.toFixed(2)}</p>
          <button className="order-button">Order now</button>
        </div>
      </div>
    </div>
  );
}
