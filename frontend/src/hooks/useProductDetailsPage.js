import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cart';
import { toast } from 'react-toastify';
import { ErrorHandlerToast } from '../components/general/ErrorHandler';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/product';

const useProductDetailsPage = () => {
  // Grab product ID
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user info
  const userInfo = useSelector((state) => state.auth.userInfo);

  // Component base state
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Product endpoint
  const {
    data: product,
    isLoading: isProductLoading,
    refetch,
    error: productError,
  } = useGetProductDetailsQuery(productId);

  // Create review endpoint
  const [createRiview, { isLoading: isReviewLoading }] =
    useCreateReviewMutation();

  // Add to cart and redirect
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const reviewSubmitHandler = async (e) => {
    e.preventDefault();

    // Create review
    const { data, error } = await createRiview({
      productId,
      rating,
      comment,
    });

    // Error handling
    if (error) return ErrorHandlerToast(error);

    // On successe
    refetch();
    toast.success(data);
    setRating(0);
    setComment('');
  };

  return {
    product,
    addToCartHandler,
    reviewSubmitHandler,
    userInfo,
    qty,
    setQty,
    rating,
    setRating,
    comment,
    setComment,
    isProductLoading,
    isReviewLoading,
    productError,
  };
};

export default useProductDetailsPage;
