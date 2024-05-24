import "./Home.css";
import Product from "../Components/Product";
import useFetchData from "../customhooks/Getdata";
export default function Men() {
  // Fetch data using custom hook
  const { data: products, loading, error } = useFetchData(
    "http://localhost:4000/api/v1/fetchdata"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="Home"> {/* Main container for the Men page */}
      {/* Map through product data and render Product component for each men's clothing product */}
      {products.map((product) => {
        if (product.category === `men's clothing`) { // Check if the product belongs to men's clothing category
          return <Product key={product.id} product={product} />;
        } 
      })}
    </div>
  );
}
