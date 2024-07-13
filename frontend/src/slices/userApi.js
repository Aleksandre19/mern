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
      profile: builder.mutation({
        query: (data) => ({
          url: USERS_URL,
          method: 'PUT',
          body: data,
        }),
      }),
      getUsers: builder.query({
        query: () => ({
          url: USERS_URL,
        }),
        providesTags: ['Users'], // Remove from cache when user is updated
        keepUnusedDataFor: 5,
      }),
      deleteUser: builder.mutation({
        query: (orderId) => ({
          url: `${USERS_URL}/${orderId}`,
          method: 'DELETE',
        }),
      }),
      getUserDetails: builder.query({
        query: (userId) => ({
          url: `${USERS_URL}/${userId}`,
        }),
        keepUnusedDataFor: 5,
      }),
      updateUser: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/${data._id}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['Users'],
      }),
    }),
  });

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = userApi();
