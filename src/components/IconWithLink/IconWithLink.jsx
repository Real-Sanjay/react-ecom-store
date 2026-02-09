import React from "react";
import './IconWithLink.css'

import { NavLink } from "react-router-dom";

const IconWithLink = ({title, icon, link, sidebar}) => {
  return (
      <NavLink to={link} className={sidebar ? "sidebar_link align-items"  : "align-items navlinks_link"}>
        {title}
        <img src={icon} alt="icon" className="link_icon" />
      </NavLink>
  );
};

export default IconWithLink;
