import React, { useCallback, useEffect, useReducer, useState } from "react";

import "./app.css";
import NavBar from "./components/Navbar/NavBar";
import Main from "./components/Main/Main";
import { getItem, setAuthToken } from "./util/StorageUtil";
import { jwtDecode } from "jwt-decode";
import {
  addToCart as addToCartService,
  getCartItems,
} from "./services/cartService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userContext from "./context/userContext";
import cartContext from "./context/cartContext";
import { updateCartItemQuantity } from "./services/cartService";
import cartReducer from "./Reducers/cartReducer";

setAuthToken(getItem("token"));

const App = () => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [user, setuser] = useState(null);


  useEffect(() => {
    try {
      const token = getItem("token");
      if (!token) return;
      const jwtUserObject = jwtDecode(token);
      console.log("jwt decoded user", jwtUserObject);
      if (Date.now() >= jwtUserObject.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setuser(jwtUserObject);
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (user) {
      getCartItems()
        .then((res) => {
          dispatch({ type: "SET_CART", payload: res.data });
        })
        .catch((error) => {
          toast.error("Failed to fetch cart details!");
        });
    }
  }, [user]);

  // function to add products, qnty to cart
  const addToCart = useCallback(
    (product, quantity) => {
      dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
      addToCartService(product._id, { quantity })
        .then((res) => {
          toast.success("Added to cart successfully!");
        })
        .catch((error) => {
          toast.error("Error adding to cart!");
          console.error(error);
          dispatch({ type: "FALLBACK_CART", payload: cart });
        });
    },
    [cart],
  );

  const updateCartQuantity = useCallback(
    async (type, productId) => {
      dispatch({ type: "UPDATE_CART", payload: { type, productId } });
      if (type === "decrease") {
        // make api call to decrease quantity of the product in cart
        try {
          await updateCartItemQuantity(productId, "decrease");
        } catch (error) {
          toast.error("Error while decreasing cart item quantity");
          return;
        }
      } else if (type === "increase") {
        // make api call to increase quantity of the product in cart
        try {
          await updateCartItemQuantity(productId, "increase");
        } catch (error) {
          toast.error("Error while increasing cart item quantity");
          return;
        }
      }
    },
    [cart],
  );

  return (
    <userContext.Provider value={user}>
      <cartContext.Provider
        value={{ cart, dispatch, addToCart, updateCartQuantity }}
      >
        <div className="app">
          <NavBar user={user} cartCount={cart?.length}></NavBar>
          <ToastContainer position="bottom-center" />
          <Main />
        </div>
      </cartContext.Provider>
    </userContext.Provider>
  );
};

export default App;
