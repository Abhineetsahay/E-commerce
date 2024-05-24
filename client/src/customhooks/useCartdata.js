import { useEffect, useState } from 'react';
import axios from 'axios';

const useCartData = () => {
  const [cartData, setCartData] = useState({ cart: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    const fetchCartData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/api/v1/getcartdata', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setCartData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  return { cartData, loading, error, isLoggedIn };
};

export default useCartData;
