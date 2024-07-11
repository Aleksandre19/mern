import { apiClice } from './api';
import { ORDERS_URL } from '../constants';

export const ordersApi = apiClice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...data },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
