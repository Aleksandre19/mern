import { configureStore } from '@reduxjs/toolkit';
import { apiClice } from './slices/api';
import cartSliceReducer from './slices/cart';
import authSliceReducer from './slices/auth';
import homeSliceReducer from './slices/home';

const store = configureStore({
  reducer: {
    [apiClice.reducerPath]: apiClice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
    home: homeSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiClice.middleware),
  devTools: true,
});

export default store;
