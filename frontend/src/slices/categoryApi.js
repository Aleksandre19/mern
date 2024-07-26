import { apiClice } from './api';
import { CATEGORIES_URL } from '../constants';

export const categorySlice = apiClice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: CATEGORIES_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetCategoriesQuery } = categorySlice;
