import "./QuantityInputBtn.css";

const QuantityInputBtn = ({ quantity, setquantity, stock, productId, isCartPage }) => {

  return (
    <div className="align-items quantity_input">
      <button
        className="quantity_input_btn"
        onClick={ () => isCartPage ? setquantity("decrease", productId) : setquantity(quantity -1)}
        disabled = {quantity === 1}
      >
        -
      </button>

      <p className="quantity_input_count">{quantity}</p>

      <button
        className="quantity_input_btn"
        onClick={() => isCartPage ? setquantity("increase", productId) : setquantity(quantity + 1)}
        disabled = {quantity === stock}
      >
        +
      </button>
    </div>
  );
};

export default QuantityInputBtn;
