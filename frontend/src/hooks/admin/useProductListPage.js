import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/product';

const useProductListPage = () => {
  // Get current page number
  const { pageNumber } = useParams();

  // Get current product
  const {
    data,
    isLoading: getProductLoading,
    error: getProductError,
    refetch,
  } = useGetProductsQuery({ pageNumber });

  // Create product endpoint
  const [createProduct, { isLoading: createProductLoading }] =
    useCreateProductMutation();

  // Delete product endpoint
  const [deleteProduct, { isLoading: deleteProductLoading }] =
    useDeleteProductMutation();

  // Create product handler
  const createProductHandler = async () => {
    // Confirm action
    if (window.confirm('Are you sure?')) {
      // Create product
      const { data: message, error } = await createProduct();

      // Handle error
      if (error) return toast.error(error?.data?.message || error.message);

      // On success
      toast.success(message);
      refetch();
    }
  };

  // Delete product handler
  const deleteHandler = async (productId) => {
    // Confirm action
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Delete product
      const { data: message, error } = await deleteProduct(productId);

      // Handle error
      if (error) return toast.error(error?.data?.message || error.message);

      // On success
      toast.success(message);
      refetch();
    }
  };

  return {
    data,
    deleteHandler,
    createProductHandler,
    getProductLoading,
    createProductLoading,
    deleteProductLoading,
    getProductError,
  };
};

export default useProductListPage;
