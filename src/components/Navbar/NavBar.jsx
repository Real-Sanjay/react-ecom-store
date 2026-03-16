import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import "./NavBar.css";
import IconWithLink from "../IconWithLink/IconWithLink";
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
    <motion.nav className="align-items navbar" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition= {{duration: 1, ease: "easeInout"}} >
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
        <IconWithLink title={"Home"} link="/" />
        <IconWithLink title={"Products"} link="/products" />
        {!user && (
          <>
            <IconWithLink title={"Login"} link="/login" />
            <IconWithLink title={"SignUp"} link="/signup" />
          </>
        )}
        <IconWithLink title={"My Orders"} link="/myorder" />
        {user && <IconWithLink title={"Logout"} link="/logout" />}

        <IconWithLink title={"Cart"} link="/cartpage" cartCount={cartCount} />
      </div>
    </motion.nav>
  );
};

export default NavBar;
