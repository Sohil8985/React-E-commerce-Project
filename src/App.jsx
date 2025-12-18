import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import SingleProduct from "./pages/SingleProduct";
import CategoryProduct from "./pages/CategoryProduct";
import { useCart } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [location, setLocation] = useState();
  const [openDropdown, setOpenDropdown] = useState(false);
  const { cartItem, setCartItem } = useCart();
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      try {
        const location = await axios.get(url);
        const exactLocation = location.data.address;
        setLocation(exactLocation);
        setOpenDropdown(false);
      } catch (error) {
        console.log(error);
      }
    });
  };
  useEffect(() => {
    getLocation();
  }, []);

  //load cart local on initial render
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cartItem");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCartItem(parsedCart);
        }
      }
    } catch (error) {
      console.log("Failed to parse cart from localstorage ", error);
    }
  }, []);

  //save cart to local storage it change
  useEffect(() => {
    if (cartItem.length > 0) {
      localStorage.setItem("cartItem", JSON.stringify(cartItem));
    } else {
      localStorage.removeItem("cartItem");
    }
  }, [cartItem]);
  return (
    <BrowserRouter>
      <div className="overflow-x-hidden">
        <Navbar
          location={location}
          getLocation={getLocation}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:id" element={<SingleProduct />}></Route>
          <Route
            path="/category/:category"
            element={<CategoryProduct />}
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart location={location} getLocation={getLocation} />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
