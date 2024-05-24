import { useEffect, useState } from 'react';
import axios from 'axios';

const useName = () => {
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/getSignin', {
          headers: {
            'Authorization': `Bearer ${token}`,  // Assuming a Bearer token
            'Content-Type': 'application/json'
          }
        });

        const jsondata = response.data;
        const { username } = jsondata;
        setName(username);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return { name, isLoggedIn };
};

export default useName;
