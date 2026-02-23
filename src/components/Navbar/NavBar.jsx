import React from "react";
import "./NavBar.css";
import IconWithLink from "../IconWithLink/IconWithLink";
import Rocket from "../../assets/rocket.png";
import Star from "../../assets/glowing-star.png";
import IdButton from "../../assets/id-button.png";
import Memo from "../../assets/memo.png";
import Order from "../../assets/package.png";
import Lock from "../../assets/locked.png";
import Cart from "../../assets/basket.png";
import { Link } from "react-router-dom";

const NavBar = ({ user, cartCount }) => {
  console.log("cart count in navbar", cartCount);
  return (
    <nav className="align-items navbar">
      <div className="align-items">
        <h1 className="navbar_heading">CartWish</h1>
        <form action="" className="align-items navbar_form">
          <input
            placeholder="Search Products"
            className="navbar_search"
            type="text"
          />
          <button className="navbar_button">Search</button>
        </form>
      </div>
      <div className="align-items navlinks">
        <IconWithLink title={"Home"} link={"/"} icon={Rocket} />
        <IconWithLink title={"Products"} link={"/products"} icon={Star} />
        {!user && (
          <>
            <IconWithLink title={"Login"} link={"/login"} icon={IdButton} />
            <IconWithLink title={"SignUp"} link={"/signup"} icon={Memo} />
          </>
        )}
        <IconWithLink title={"My Orders"} link={"/myorder"} icon={Order} />
        {user && <IconWithLink title={"Logout"} link={"/logout"} icon={Lock} />}
        <Link to={"/cartpage"} className="align-items cart_link"> Cart <span className="align-items cart_link_icon">{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
