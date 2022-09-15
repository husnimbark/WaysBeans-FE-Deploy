import React, { useContext, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  BrowserRouter,
  Switch,
} from "react-router-dom";
import { API, setAuthToken } from "./config/api";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import AddBeans from "./pages/AddBeans";
import ListProduct from "./pages/ListProduct";
import Profile from "./pages/Profile";
import Transaction from "./pages/Transaction";
import AddCart from "./pages/AddCart";
import UpdateProduct from "./pages/UpdateProduct";
import { UserContext } from "./context/UserContext";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();

  // Init user context here ...
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/");
    } else {
      if (state.user.status === "admin") {
        navigate("/transaction");
      } else if (state.user.status === "customer") {
        navigate("/homepage");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "LOGIN_USER",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/add-beans" element={<AddBeans />} />
      <Route path="/list-product" element={<ListProduct />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/add-cart/:id" element={<AddCart />} />
      <Route path="/update-product/:id" element={<UpdateProduct />} />
    </Routes>
  );
}

export default App;
