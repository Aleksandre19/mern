import { configureStore } from '@reduxjs/toolkit';
import { apiClice } from './slices/api';

const store = configureStore({
  reducer: {
    [apiClice.reducerPath]: apiClice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiClice.middleware),
  devTools: true,
});

export default store;
