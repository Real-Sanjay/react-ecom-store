import React from "react";

import "./QuantityInputBtn.css";

const QuantityInputBtn = () => {
  return (
    <div className="align-items quantity_input">
      <button className="quantity_input_btn" disabled>
        -
      </button>
      <p className="quantity_input_count">1</p>
      <button className="quantity_input_btn">+</button>
    </div>
  );
};

export default QuantityInputBtn;
