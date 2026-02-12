import React from "react";
import "./ProductCard.css";

import Iphone from "../../assets/iphone.jpg";
import Star from "../../assets/white-star.png";
import Basket from "../../assets/basket.png";
import {Link} from "react-router-dom"

const ProductCard = ({images, price, reviews, stock, title, id}) => {
  return (
    <article className="product-card">
      <Link to={`/products/${id}`} href="#" className="product-card-image align-items">
        <img src={`http://localhost:5000/products/${images[0]}`} alt="iPhone 14 Pro" />
      </Link>

      <div className="product-card__content">
        <h3 className="product-card__price">{price}</h3>
        <p className="product-card__title">{title}</p>

        <footer className="product-card__footer align-items">
          <div className="product-card__rating align-items">
            <span className="rating-badge align-items">
              <img src={Star} alt="" />
              {reviews.rate}
            </span>
            <span className="rating-count">{reviews.count}</span>
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
