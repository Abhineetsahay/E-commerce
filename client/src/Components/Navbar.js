import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import useName from "../customhooks/Getusername";
import { deleteuser } from "../Redux/slice/DeleteAcc";
import { useState, useEffect } from "react";
import useCartData from "../customhooks/useCartdata";

function Navbar() {
  const { name, isLoggedIn } = useName();
  const dispatch = useDispatch();
  const [Name, setName] = useState("");

  useEffect(() => {
    setName(name);
  }, [name]);

  const { cartData, loading, error } = useCartData();

  const deleteUser = () => {
    dispatch(deleteuser());
    window.location.reload();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const cartLength = cartData?.cart?.length || 0;

  return (
    <nav className="navbar">
      <div className="navbar-items">
        {/* Logo */}
        <div className="image1">
          <img className="images" src="../logo.png" alt="Logo" />{" "}
          {/* Ensure this path is correct */}
        </div>
        <div className="Navabar-compo">
          {/* Navigation links */}
          <div className="Home-cart">
            <Link to="/Home" className="link">
              <p className="home">Home</p>
            </Link>
            <Link to="/Home/men" className="link">
              <p className="home">Men</p>
            </Link>
            <Link to="/Home/women" className="link">
              <p className="home">Women</p>
            </Link>
            {isLoggedIn ? (
              <div className="dropdown">
                <p className="home">{Name}</p>
                <div className="dropdown-content">
                  <button className="logout" onClick={logout}>
                    Log Out
                  </button>
                  <button className="delete" onClick={deleteUser}>
                    Delete Account
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="link">
                <p className="home">Login</p>
              </Link>
            )}
            {/* Link to Cart */}
            <Link to="/Home/cart" className="link">
              <FaShoppingCart />
              {/* Display cart item count if cart is not empty */}
              {!loading && !error && cartLength > 0 && (
                <span className="superscript">{cartLength}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
