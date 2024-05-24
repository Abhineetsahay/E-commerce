import "./Home.css";
import Product from "../Components/Product";
import useFetchData from "../customhooks/Getdata";

export default function Home() {
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
    <div className="Home">
      {/* Map through product data and render Product component for each product */}
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
