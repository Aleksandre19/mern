import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cart';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { orderItems: [], shippingAdress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Get current item
      const item = action.payload;

      // Check if item exists
      const itemExists = state.orderItems.find((i) => i._id === item._id);

      // Update/Add itme
      if (itemExists) {
        state.orderItems = state.orderItems.map((i) =>
          i._id === itemExists._id ? item : i
        );
      } else {
        state.orderItems = [...state.orderItems, item];
      }

      // Calculate cost
      return updateCart(state);
    },
    removeCart: (state, action) => {
      state.orderItems = state.orderItems.filter(
        (i) => i._id !== action.payload
      );
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePayment: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCart: (state, action) => {
      state.orderItems = [];
      return updateCart(state);
    },
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeCart,
  saveShippingAddress,
  savePayment,
  clearCart,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
