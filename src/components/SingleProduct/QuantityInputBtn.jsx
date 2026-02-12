import React, { useState } from "react";
import "./QuantityInputBtn.css";

const QuantityInputBtn = ({ count, setCount, stock}) => {

  return (
    <div className="align-items quantity_input">
      <button
        className="quantity_input_btn"
        onClick={() => setCount(prev => prev > 1 ? prev - 1 : 1)}
        disabled = {count === 1}
      >
        -
      </button>

      <p className="quantity_input_count">{count}</p>

      <button
        className="quantity_input_btn"
        onClick={() => setCount(prev => prev + 1)}
        disabled = {count === stock}
      >
        +
      </button>
    </div>
  );
};

export default QuantityInputBtn;
