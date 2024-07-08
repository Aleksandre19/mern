import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // Check if item exists
      const itemExists = state.cartItems.find((i) => i._id === item._id);

      // Update/Add item
      if (itemExists) {
        state.cartItems = state.cratItems.map((i) =>
          i._id === item._id ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // All items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // Shipping price
      state.shipoingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // Tax price
      state.taxPrice = addDecimals(
        Number((state.itemsPrice * 0.15).toFixed(2))
      );

      // Total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shipoingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      // Save to local storage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
