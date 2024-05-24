import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook for fetching data
const useFetchData = (url) => {
  // State to store the fetched data
  const [data, setData] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // State to manage error state
  const [error, setError] = useState(null);

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data.result);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchData;
