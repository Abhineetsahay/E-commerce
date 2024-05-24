import { useDispatch } from "react-redux";
import "./Cartitem.css";
import toast from "react-hot-toast";
import { remove } from "../Redux/slice/Slice";
import { useState } from "react";
import { deleteCartData } from "../Redux/slice/Deletecart";

export default function Cartitem({
  cartItem,
  updatetotalamount,
  decreasetotalamount,
}) {
  const [quantity, setQuantity] = useState(1); // State to manage quantity
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // Function to remove item from cart
  const removefromcart = async () => {
    setLoading(true);
     dispatch(deleteCartData(cartItem)); // Wait for the dispatch to complete
    dispatch(remove(cartItem.id)); // Dispatch action to remove item from Redux store
    setLoading(false);
    window.location.reload();
    toast.error("Item Removed"); // Display toast notification
  };

  // Function to decrement quantity
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Decrease quantity
      decreasetotalamount(cartItem.price); // Decrease total amount
    } else {
      removefromcart(); // If quantity is 1, remove from cart
    }
  };

  // Function to increment quantity
  const increment = () => {
    setQuantity(quantity + 1); // Increase quantity
    updatetotalamount(cartItem.price); // Increase total amount
  };

  return (
    <div className="cart-items">
      {loading ? (
        <div className="loading">
          <span className="loader1"></span>
        </div>
      ) : (
        <>
          <div className="cart-image">
            {/* <img className="cart-image" src={cartItem.image} alt={cartItem.title} /> */}
          </div>
          <div className="cart-about">
            <p className="cart-title">{cartItem.title}</p>
            <p className="cart-description">{cartItem.description}</p>
            <p className="cart-price">${cartItem.price}</p>
            <div className="Quantity-buttons">
              <p className="Quantity">Quantity: {quantity}</p>
              <button className="button" onClick={decrement}>
                -
              </button>
              <button className="button" onClick={increment}>
                +
              </button>
            </div>
            <div className="cart-remove">
              <button className="cart-remove-button" onClick={removefromcart}>
                Remove from Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
