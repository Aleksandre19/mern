import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cart';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // Check if item exists
      const itemExists = state.cartItems.find((i) => {
        i._id === item._id;
      });

      // Update/Add item
      if (itemExists) {
        state.cartItems = state.cratItems.map((i) =>
          i._id === item._id ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
