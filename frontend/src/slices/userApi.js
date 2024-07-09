import { USERS_URL } from '../constants';
import { apiClice } from './api';

export const userApi = () =>
  apiClice.injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/auth`,
          method: 'POST',
          body: data,
        }),
        keepUnusedDataFor: 5,
      }),
      register: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}`,
          method: 'POST',
          body: data,
        }),
      }),
      logout: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/logout`,
          method: 'POST',
        }),
      }),
    }),
  });

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = userApi();
