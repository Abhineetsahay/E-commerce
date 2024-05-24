import { useDispatch } from 'react-redux';
import { add, postCartData, remove } from '../Redux/slice/Slice';
import toast from 'react-hot-toast';
import './Product.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useCartData from '../customhooks/useCartdata';
export default function Product({ product }) {
  const { cartData } = useCartData(); // Use the custom hook to get cart data
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    setIsInCart(cartData.cart.some((p) => p.id === product.id));
  }, [cartData.cart, product.id]);
  
  async function addtocart() {
    dispatch(add(product)); // Dispatch add action with product
    try {
      await dispatch(postCartData(product)).unwrap(); // Unwrap the result for handling the fulfilled/rejected state
      setIsInCart(true);
      toast.success('Item added successfully'); // Display success toast notification
    } catch (error) {
      toast.error('Failed to add item'); // Display error toast notification
    }
  }

  function removefromcart() {
    dispatch(remove(product.id)); // Dispatch remove action with product ID
    setIsInCart(false);
    navigate('/Home/cart');
    // toast.error('Item removed'); // Display error toast notification
  }

  return (
    <div className="product">
      {/* Product title */}
      <div className="product-title">
        <p className="title">{product.title}</p>
      </div>
      {/* Product description */}
      <div className="product-description">
        <p className="description">
          {product.description.split(' ').slice(0, 10).join(' ') + '...'}
        </p>
      </div>
      {/* Product image */}
      <div className="product-image">
        <img className="image" src={product.image} alt="product" />
      </div>
      {/* Product price and cart button */}
      <div className="price-cart">
        {/* Product price */}
        <div className="product-price">
          <p className="price">${product.price}</p>
        </div> 
        {/* Add to cart or remove from cart button */}
        <div className="product-cart">
          {isInCart ? (
            // If product is in cart, show remove button
            <button className="cart-button" onClick={removefromcart}>
              Go to cart
            </button>
          ) : (
            // If product is not in cart, show add button
            <button className="cart-button" onClick={addtocart}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
