import {
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/product';
import { toast } from 'react-toastify';

const useProductListPage = (refetch) => {
  // Create product endpoint
  const [createProduct, { isLoading: createProductLoading }] =
    useCreateProductMutation();

  // Delete product endpoint
  const [deleteProduct, { isLoading: deleteProductLoading }] =
    useDeleteProductMutation();

  // Create product handler
  const createProductHandler = async () => {
    if (window.confirm('Are you sure?')) {
      const { error } = await createProduct();

      if (error) return toast.error(error?.data?.message || error.message);
      refetch();
    }
  };

  // Delete product handler
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      const { error } = await deleteProduct(id);

      if (error) return toast.error(error?.data?.message || error.message);

      toast.success('Product deleted successfully!');
      refetch();
    }
  };

  return {
    deleteHandler,
    createProductHandler,
    createProductLoading,
    deleteProductLoading,
  };
};

export default useProductListPage;
