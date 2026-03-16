import './IconWithLink.css'
import { NavLink, useSearchParams } from "react-router-dom";

const IconWithLink = ({ title, link, sidebar, cartCount }) => {

const [searchParam] = useSearchParams();

const isActive = (sidebar && decodeURIComponent(searchParam.get("category")) === title)
  
  return (
    <NavLink
      to={link}
      end
      className={({ isActive: navActive }) =>
        `${sidebar ? "sidebar_link" : "navlinks_link nav_item"} ${
          navActive ? "active_link" : ""
        }
        ${
          isActive ? "active_item" : ""
        }
        `
      }
    >
      {title}
      {(title === "Cart" && cartCount > 0) &&<span className="cart_count">{cartCount}</span>}
    </NavLink>
  );
};

export default IconWithLink;
