import React, { useCallback, useEffect, useReducer, useState } from "react";

import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import Main from "./components/Main/Main";
import { getItem, setAuthToken } from "./util/StorageUtil";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userContext from "./context/userContext";
import cartContext from "./context/cartContext";
import cartReducer from "./Reducers/cartReducer";
import useData from "./hooks/useData";
import useAddToCart from "./hooks/useAddToCart";
import useUpdateCart from "./hooks/useUpdateCart";
import useDeleteCart from './hooks/useDeleteCart';

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

  const { data: cartData, refetch } = useData("/cart", ["cart"]);

  const addToCartMutation = useAddToCart();
  const useUpdateCartMutation = useUpdateCart();
  const useDeleteCartMutation = useDeleteCart();

  useEffect(() => {
    if (cartData) {
      dispatch({ type: "SET_CART", payload: cartData });
    }
  }, [cartData]);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  // function to add products, qnty to cart
  const addToCart = useCallback(
    (product, quantity) => {
      dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
      addToCartMutation.mutate(
        { id: product._id, quantity },
        {
          onError: (error) => {
            toast.error("Error adding to cart!");
            console.error(error);
            dispatch({ type: "FALLBACK_CART", payload: cart });
          },
        },
      );
      toast.success("Added to cart successfully!");
    },
    [cart],
  );

  const updateCartQuantity = useCallback(
    async (type, productId) => {
      dispatch({ type: "UPDATE_CART", payload: { type, productId } });
      if (type === "decrease") {
        // make api call to decrease quantity of the product in cart
        try {
          useUpdateCartMutation.mutate(
            { id: productId, action: "decrease" },
            {
              onError: (error) => {
                toast.error("Error updating quantity");
                console.error(error);
                dispatch({ type: "FALLBACK_CART", payload: cart });
              },
            },
          );
        } catch (error) {
          toast.error("Error while decreasing cart item quantity");
          return;
        }
      } else if (type === "increase") {
        // make api call to increase quantity of the product in cart
        try {
          useUpdateCartMutation.mutate(
            { id: productId, action: "increase" },
            {
              onError: (error) => {
                toast.error("Error updating quantity");
                console.error(error);
                dispatch({ type: "FALLBACK_CART", payload: cart });
              },
            },
          );
        } catch (error) {
          toast.error("Error while increasing cart item quantity");
          return;
        }
      }
    },
    [cart],
  );

    const deleteProductFromCart = async (id) => {
        try {
          useDeleteCartMutation.mutate(id, {onError: (error) => {
            toast.error("error deleting the product");
            console.error("cart delete error", error);
            dispatch({ type: "FALLBACK_CART", payload: cart });
          }})
        } catch (error) {
          console.log("error while deleting cart item", error);
          return;
        }
        dispatch({ type: "DELETE_CART_ITEM", payload: { productId: id } });
        toast.success("item removed from cart");
    }

  return (
    <userContext.Provider value={user}>
      <cartContext.Provider
        value={{ cart, dispatch, addToCart, updateCartQuantity, deleteProductFromCart }}
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
