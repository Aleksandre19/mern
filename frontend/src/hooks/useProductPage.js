import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../slices/product';
import { addToCart } from '../slices/cart';
import { toast } from 'react-toastify';

const useProducPage = () => {
  // Grab product ID
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Component base state
  const [qty, setQty] = useState(1);

  // Fetch product data
  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);

  // Error handling
  if (error)
    return toast.error(
      error?.data?.message || error?.data || error.message || 'Authentication error'
    );

  // Add to cart and redirect
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return {
    product,
    addToCartHandler,
    qty,
    setQty,
    Link,
    isLoading,
    error,
  };
};

export default useProducPage;
