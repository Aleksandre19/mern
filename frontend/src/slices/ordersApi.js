import { method } from 'lodash';
import { apiSlice } from '../utils/apiSlice';
import { ORDERS_URL } from '../utils/constants';

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutationa({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
