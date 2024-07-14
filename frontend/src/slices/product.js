import { PRODUCTS_URL, UPLOADS_URL } from '../constants';
import { apiClice } from './api';

export const productSlice = () =>
  apiClice.injectEndpoints({
    endpoints: (builder) => ({
      getProducts: builder.query({
        query: () => ({
          url: PRODUCTS_URL,
        }),
        providesTags: ['Products'],
        keepUnusedDataFor: 5,
      }),
      getProductDetails: builder.query({
        query: (id) => ({
          url: `${PRODUCTS_URL}/${id}`,
        }),
      }),
      createProduct: builder.mutation({
        query: () => ({
          url: PRODUCTS_URL,
          method: 'POST',
        }),
        invalidatesTags: ['Products'], // Prevent Caching
      }),
      updateProduct: builder.mutation({
        query: (data) => ({
          url: `${PRODUCTS_URL}/${data._id}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['Products'], // Prevent Caching
      }),
      uploadImage: builder.mutation({
        query: (data) => ({
          url: `${UPLOADS_URL}`,
          method: 'POST',
          body: data,
        }),
      }),
      deleteProduct: builder.mutation({
        query: (productId) => ({
          url: `${PRODUCTS_URL}/${productId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Products'], // Prevent Caching
      }),
      createReview: builder.mutation({
        query: (data) => ({
          url: `${PRODUCTS_URL}/${data.productId}/reviews`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Products'],
      }),
    }),
  });

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
} = productSlice();
