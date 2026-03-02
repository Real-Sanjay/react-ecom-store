import React, { useCallback, useContext, useEffect, useState } from "react";

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

setAuthToken(getItem("token"));

const App = () => {
  const [cart, setcart] = useState([]);
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

  useCallback(() => {
    if (user) {
      getCartItems()
        .then((res) => {
          setcart(res.data);
        })
        .catch((error) => {
          toast.error("Failed to fetch cart details!");
        });
    }
  }, [user]);

  // function to add products, qnty to cart
  const addToCart = useCallback((product, quantity) => {
    const updatedCart = [...cart];
    const currentProductIndex = updatedCart.findIndex(
      (cartProd) => cartProd.product._id === product?._id,
    );
    if (currentProductIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[currentProductIndex].quantity += quantity;
    }
    setcart(updatedCart);
    addToCartService(product._id, { quantity })
      .then((res) => {
        toast.success("Added to cart successfully!");
      })
      .catch((error) => {
        toast.error("Error adding to cart!");
        console.error(error);
        setcart(cart);
      });
  }, [cart]);

  const updateCartQuantity = useCallback(async (type, productId) => {
    if (type === "decrease") {
      setcart(
        cart.map((item) => {
          if (item.product._id === productId && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }),
      );
      // make api call to decrease quantity of the product in cart
      try {
        await updateCartItemQuantity(productId,"decrease");
      } catch (error) {
        toast.error("Error while decreasing cart item quantity");
        return;
      }
    } else if (type === "increase") {
      const updatedCart = cart.map((item) => {
          if (item.product._id === productId && item.quantity < item?.product?.stock) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      setcart(updatedCart);
      // make api call to increase quantity of the product in cart
      try {
        await updateCartItemQuantity(productId, "increase");
      } catch (error) {
        toast.error("Error while increasing cart item quantity");
        return;
      }
    }
  }, [cart]);


  return (
    <userContext.Provider value={user}>
      <cartContext.Provider
        value={{ cart, setcart, addToCart, updateCartQuantity}}
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
