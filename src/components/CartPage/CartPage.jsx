import React from "react";

import "./CartPage.css";
import User from "../../assets/user.webp";
import Table from "../common/Table/Table";
import QuantityInputBtn from "../SingleProduct/QuantityInputBtn";
import RemoveIcon from '../../assets/remove.png'

const CartPage = () => {
  return (
    <section className="align-items cart_page">
      <div className="user_profile align-items">
        <img src={User} alt="profile pic" className="user_profile_pic" />
        <div className="profile_details">
          <p className="user_name">Harley</p>
          <p className="user_email">harley@test.com</p>
        </div>
      </div>

      <Table heading={["item", "price", "quantity", "total", "remove"]}>
        <tbody>
          <tr>
            <td>Item 1</td>
            <td>$100</td>
            <td><QuantityInputBtn/></td>
            <td>$200</td>
            <td><img src={RemoveIcon} alt="remove" className="remove_icon"/></td>
          </tr>
        </tbody>
      </Table>

      <table className="bill_detail">
        <thead>
          <tr>
            <td>Subtotal</td>
            <td>$999</td>
          </tr>
          <tr>
            <td>Shipping Charges</td>
            <td>$9</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>$1009</td>
          </tr>
        </thead>
      </table>
      <button className="checkout_btn">CheckOut</button>
    </section>
  );
};

export default CartPage;
