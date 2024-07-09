import { configureStore } from '@reduxjs/toolkit';
import { apiClice } from './slices/api';
import cartSliceReducer from './slices/cart';
import authSliceReducer from './slices/auth';

const store = configureStore({
  reducer: {
    [apiClice.reducerPath]: apiClice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiClice.middleware),
  devTools: true,
});

export default store;
