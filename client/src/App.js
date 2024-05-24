import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Page/Home";
import Cart from "./Page/Cart";
import Men from "./Page/Men";
import Women from "./Page/Women";
import Nopage from "./Page/Nopage";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Login" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route
          path="/*"
          element={<ProtectedRoutes />} // Wrap all routes except Login with ProtectedRoutes
        />
      </Routes>
    </div>
  );
}

// Component for all protected routes
function ProtectedRoutes() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/Login";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Home/cart" element={<Cart/>} />
        <Route path="/Home/men" element={<Men />} />
        <Route path="/Home/women" element={<Women />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </>
  );
}

export default App;
