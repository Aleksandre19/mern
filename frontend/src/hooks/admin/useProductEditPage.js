import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorHandlerToast } from '../../components/general/ErrorHandler';
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadImageMutation,
} from '../../slices/product';
import { useGetCategoriesQuery } from '../../slices/categoryApi';
import { toast } from 'react-toastify';

const useProductEditPage = (
  name,
  setName,
  price,
  setPrice,
  image,
  setImage,
  category,
  setCategory,
  countInStock,
  setCountInStock,
  description,
  setDescription
) => {
  // Product Id
  const { id: prodyctId } = useParams();
  const navigate = useNavigate();

  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesIsLoading,
  } = useGetCategoriesQuery();

  // Product by Id
  const {
    data: product,
    isLoading: productLoading,
    refetch,
    error: productError,
  } = useGetProductDetailsQuery(prodyctId);

  // Update state
  useEffect(() => {
    if (!product) return;
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
  }, [product]);

  // Update product endpoint
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();

  // Upload image endpoint
  const [uploadImage, { isLoading: uploadLoading }] = useUploadImageMutation();

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    // Product structure for updating
    const updatedProduct = {
      _id: prodyctId,
      name,
      price,
      image,
      category,
      countInStock,
      description,
    };

    // Update product request
    const result = await updateProduct(updatedProduct);

    // Handle error
    if (result.error) return ErrorHandlerToast(result.error);

    // Handle success
    toast.success('Product updated successfully');
    refetch();
    navigate('/admin/productlist');
  };

  // Upload image handler
  const uploadImageHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    const { data, error } = await uploadImage(formData);
    if (error) return ErrorHandlerToast(error);

    setImage(data.image);
    toast.success(data.message);
  };

  return {
    submitHandler,
    uploadImageHandler,
    categories,
    productLoading,
    updateLoading,
    uploadLoading,
    categoriesIsLoading,
    productError,
    categoriesError,
  };
};

export default useProductEditPage;
