import {
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/product';
import { toast } from 'react-toastify';

const useProductListPage = (products, refetch) => {
  // Create product endpoint
  const [createProduct, { createProductLoading, createProductError }] =
    useCreateProductMutation();

  // Delete product endpoint
  const [deleteProduct, { deleteProductLoading, deleteProductError }] =
    useDeleteProductMutation();

  // Create product handler
  const createProductHandler = async () => {
    if (window.confirm('Are you sure?')) {
      await createProduct();
      refetch();
    }
  };

  // Delete product handler
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteProduct(id);
      toast.success('Product deleted successfully!');
      refetch();
    }
  };

  return {
    deleteHandler,
    createProductHandler,
    createProductLoading,
    deleteProductLoading,
    createProductError,
    deleteProductError,
  };
};

export default useProductListPage;
