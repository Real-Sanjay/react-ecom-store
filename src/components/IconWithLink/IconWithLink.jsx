import React from "react";
import './IconWithLink.css'

const IconWithLink = ({title, icon, link, sidebar}) => {
  return (
      <a href={link} className={sidebar ? "sidebar_link align-items"  : "align-items navlinks_link"}>
        {title}
        <img src={icon} alt="icon" className="link_icon" />
      </a>
  );
};

export default IconWithLink;
