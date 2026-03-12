import React, { memo, useContext, useMemo } from "react";

import "./CartPage.css";
import User from "../../assets/user.webp";
import Table from "../common/Table/Table";
import QuantityInputBtn from "../SingleProduct/QuantityInputBtn";
import RemoveIcon from '../../assets/remove.png'
import userContext from './../../context/userContext';
import cartContext from './../../context/cartContext';
import { checkoutCart } from "../../services/orderService";
import { toast } from "react-toastify";

const CartPage = () => {
  const user = useContext(userContext);
  const {cart, dispatch, updateCartQuantity, deleteProductFromCart} = useContext(cartContext);

  const totalAmount = useMemo(() => {
    return cart?.reduce((acc, {product, quantity}) => acc + product.price * quantity, 0)
  }, [cart])
  


  const checkout = () => {
    const oldCartData = [...cart];
    dispatch({ type: "SET_CART", payload: [] });
    checkoutCart().then((res) => {
      toast.success("order placed successfully!");
    }).catch((error) => {
      toast.error("something went wrong!");
      dispatch({ type: "FALLBACK_CART", payload: oldCartData });
    })
  }
  return (
    <>
    {user && <>
    <section className="align-items cart_page">
      <div className="user_profile align-items">
        <img src={`http://localhost:5000/profile/${user?.profilePic}`} alt="profile pic" className="user_profile_pic" />
        <div className="profile_details">
          <p className="user_name">{user?.name}</p>
          <p className="user_email">{user?.email}</p>
        </div>
      </div>

      <Table heading={["item", "price", "quantity", "total", "remove"]}>
        <tbody>
          {cart.map(({product, quantity}) => {
            return (
              <tr key={product._id}>
            <td>{product.title}</td>
            <td>${product.price}</td>
            <td><QuantityInputBtn productId={product._id} quantity={quantity} isCartPage={true} setquantity={updateCartQuantity}/></td>
            <td>${product.price * quantity}</td>
            <td><img onClick={() => deleteProductFromCart(product._id)} src={RemoveIcon} alt="remove" className="remove_icon"/></td>
          </tr>
            )
          })}
        </tbody>
      </Table>

      <table className="bill_detail">
        <thead>
          <tr>
            <td>Subtotal</td>
            <td>${totalAmount}</td>
          </tr>
          <tr>
            <td>Shipping Charges</td>
            <td>$9</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>${totalAmount+9}</td>
          </tr>
        </thead>
      </table>
      <button onClick={() => checkout()} className="checkout_btn">CheckOut</button>
    </section>
    </>}
    </>
  );
};

export default memo(CartPage);
