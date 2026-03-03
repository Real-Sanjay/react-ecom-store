const cartReducer = (cartState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const updatedCart = [...cartState];
      const { product, quantity } = action.payload;
      const currentProductIndex = updatedCart.findIndex(
        (cartProd) => cartProd.product._id === product?._id,
      );
      if (currentProductIndex === -1) {
        updatedCart.push({ product: product, quantity: quantity });
      } else {
        updatedCart[currentProductIndex].quantity += quantity;
      }
      return updatedCart;

    case "UPDATE_CART":
      const { type, productId } = action.payload;
      if (type === "decrease") {
        return cartState.map((item) => {
          if (item.product._id === productId && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      } else if (type === "increase") {
        return cartState.map((item) => {
          if (
            item.product._id === productId &&
            item.quantity < item?.product?.stock
          ) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }

    case "SET_CART":
      return action.payload;

    case "FALLBACK_CART":
      const { fallbackCart } = action.payload;
      return fallbackCart;

    case "DELETE_CART_ITEM":
        const { productId: productIdToDelete } = action.payload;
        return cartState.filter((item) => item.product._id !== productIdToDelete);
  }
};  

export default cartReducer;
