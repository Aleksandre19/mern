import { useCreateProductMutation } from '../slices/product';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const useProductListPage = (products, refetch) => {
  // Create product endpoint
  const [createProduct, { createProductLoading, createOrderError }] =
    useCreateProductMutation();

  // Create product handler
  const createProductHandler = async () => {
    // Confirmation message
    if (window.confirm('Are you sure?')) {
      await createProduct();

      // Handle loading
      if (createProductLoading) return <Loader />;

      // Handle error
      if (createOrderError)
        if (error)
          return toast.error(
            error?.data ||
              error?.data?.message ||
              error.message ||
              'Authentication error'
          );

      refetch();
    }
  };

  const deleteHandler = (id) => {
    console.log('delete', id);
  };

  return {
    deleteHandler,
    createProductHandler,
  };
};

export default useProductListPage;
