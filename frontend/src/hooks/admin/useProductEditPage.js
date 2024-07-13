import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadImageMutation,
} from '../../slices/product';
import { toast } from 'react-toastify';

const useProductEditPage = (
  name,
  setName,
  price,
  setPrice,
  image,
  setImage,
  brand,
  setBrand,
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
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
  }, [product]);

  // Update product endpoint
  const [updateProduct, { isLoading: updateLoading, error: updateError }] =
    useUpdateProductMutation();

  // Upload image endpoint
  const [uploadImage, { isLoading: uploadLoading, error: uploadError }] =
    useUploadImageMutation();

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    // Product structure for updating
    const updatedProduct = {
      _id: prodyctId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    // Update product request
    const result = await updateProduct(updatedProduct);

    // Handle error
    if (result.error)
      return toast.error(
        result.error?.data ||
          result.error?.data?.message ||
          result.error.message ||
          'Authentication error'
      );

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
    if (error) return toast.error(error.data.message);

    setImage(data.image);
    toast.success(data.message);
  };

  return {
    submitHandler,
    uploadImageHandler,
    productLoading,
    updateLoading,
    uploadLoading,
    productError,
    updateError,
    uploadError,
  };
};

export default useProductEditPage;
