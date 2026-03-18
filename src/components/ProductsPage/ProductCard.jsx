import React, { memo, use, useContext } from "react";
import "./ProductCard.css";

import Iphone from "../../assets/iphone.jpg";
import Star from "../../assets/white-star.png";
import Basket from "../../assets/basket.png";
import { Link } from "react-router-dom";
import userContext from "../../context/userContext";
import cartContext from "../../context/cartContext";

const ProductCard = ({ product }) => {
  const user = useContext(userContext);
  const { addToCart } = useContext(cartContext);
  return (
    <article className="product-card">
      <Link
        to={`/products/${product?._id}`}
        href="#"
        className="product-card-image align-items"
      >
        <img
          src={`https://cartwish-backend-rjnx.onrender.com/products/${product?.images[0]}`}
          alt="iPhone 14 Pro"
        />
      </Link>

      <div className="product-card__content">
        <h3 className="product-card__price">${product?.price}</h3>
        <p className="product-card__title">{product?.title}</p>

        <footer className="product-card__footer align-items">
          <div className="product-card__rating align-items">
            <span className="rating-badge align-items">
              <img src={Star} alt="" />
              {product?.reviews.rate}
            </span>
            <span className="rating-count">{product?.reviews.count}</span>
          </div>

          {!!user && (
            <button
              onClick={() => addToCart(product, 1)}
              className="add-to-cart-btn"
              aria-label="Add to cart"
            >
              <img src={Basket} alt="" />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default memo(ProductCard);
