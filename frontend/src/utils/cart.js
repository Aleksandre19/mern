export const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

export const updateCart = (state) => {
  // All items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Shipping price
  state.shipoingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Tax price
  state.taxPrice = addDecimals(Number((state.itemsPrice * 0.15).toFixed(2)));

  // Total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shipoingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // Save to local storage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
