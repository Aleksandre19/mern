import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cart';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAdress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Get current item
      const item = action.payload;

      // Check if item exists
      const itemExists = state.cartItems.find((i) => i._id === item._id);

      // Update/Add itme
      if (itemExists) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === itemExists._id ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate cost
      return updateCart(state);
    },
    removeCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePayment: (state, action) => {
      state.shippingAdress = action.payload;
      return updateCart(state);
    },
  },
});
export const { addToCart, removeCart, saveShippingAddress, savePayment } =
  cartSlice.actions;
export default cartSlice.reducer;
