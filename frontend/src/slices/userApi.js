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
    }),
  });

export const { useLoginMutation } = userApi();
