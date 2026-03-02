import React, { useEffect, useState } from "react";
import "./NavBar.css";
import IconWithLink from "../IconWithLink/IconWithLink";
import Rocket from "../../assets/rocket.png";
import Star from "../../assets/glowing-star.png";
import IdButton from "../../assets/id-button.png";
import Memo from "../../assets/memo.png";
import Order from "../../assets/package.png";
import Lock from "../../assets/locked.png";
import Cart from "../../assets/basket.png";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "./../../utils/api-client";

const NavBar = ({ user, cartCount }) => {
  const [search, setsearch] = useState("");
  const [suggestion, setsuggestion] = useState([]);
  const [skipfetch, setskipfetch] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  const handleOnKeyDown = (e) => {
      if(e.key === "ArrowDown") {
        setSelectedIndex(current => current >= suggestion.length-1 ? 0 : current + 1);
      } else if(e.key === "ArrowUp") {
        setSelectedIndex(current => current <= 0 ? suggestion.length-1 : current - 1);
      } else if(e.key === "Enter") {
        const selectedSuggestion = suggestion[selectedIndex];
        handleSuggestionClick(selectedSuggestion.title);
      }
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === "") return;
    navigate(`/products?search=${search}`);
  };

  const handleSuggestionClick = (title) => {
    setsearch(title);
    setsuggestion([]);
    setskipfetch(true);
    navigate(`/products?search=${title}`);
  };

  useEffect(() => {
    const debounceSuggestion = setTimeout(() => {
      if (search.trim() === "") {
        setsuggestion([]);
        return;
      }
      if (skipfetch) {
        setskipfetch(false);
        return;
      }
      apiClient
        .get(`/products/suggestions?search=${search}`)
        .then((res) => {
          setsuggestion(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
    return () => clearTimeout(debounceSuggestion);
  }, [search]);

  return (
    <nav className="align-items navbar">
      <div className="align-items">
        <h1 className="navbar_heading">CartWish</h1>
        <form
          action=""
          className="align-items navbar_form"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Search Products"
            className="navbar_search"
            type="text"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            onKeyDown={handleOnKeyDown}
          />
          <button className="navbar_button">Search</button>
          {suggestion.length > 0 && (
            <ul className="navbar_suggestion">
              {suggestion.map((item, index) => (
                <li
                  key={item._id}
                  onClick={() => handleSuggestionClick(item.title)}
                  className={index === selectedIndex ? "navbar_suggestion_item active " : "navbar_suggestion_item"}
                >
                    {item.title}
                </li>
              ))}
            </ul>
          )}
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
        <Link to={"/cartpage"} className="align-items cart_link">
          Cart <span className="align-items cart_link_icon">{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
