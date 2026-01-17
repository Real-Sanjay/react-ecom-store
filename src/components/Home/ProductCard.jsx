import React from "react";
import "./ProductCard.css";

import Iphone from "../../assets/iphone.jpg";
import Star from "../../assets/white-star.png";
import Basket from "../../assets/basket.png";

const ProductCard = () => {
  return (
    <article className="product-card">
      <a href="#" className="product-card__image align-items">
        <img src={Iphone} alt="iPhone 14 Pro" />
      </a>

      <div className="product-card__content">
        <h3 className="product-card__price">$999</h3>
        <p className="product-card__title">iPhone 14 Pro</p>

        <footer className="product-card__footer align-items">
          <div className="product-card__rating align-items">
            <span className="rating-badge align-items">
              <img src={Star} alt="" />
              5.0
            </span>
            <span className="rating-count">120</span>
          </div>

          <button
            className="add-to-cart-btn"
            aria-label="Add to cart"
          >
            <img src={Basket} alt="" />
          </button>
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
