import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../slices/ordersApi';
import { clearCart } from '../slices/cart';

const usePlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get cart state
  const cart = useSelector((state) => state.cart);

  // Grab order action
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  // Redirect if shipping address ot payment mthodsa are missing
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAdress.address, navigate]);

  // Submit handler
  const placeOrderHandler = async () => {
    // Create order
    const { data, error } = await createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    });

    // Check errors
    if (error)
      return toast.error(
        error?.data ||
          error?.data?.message ||
          error.message ||
          'Authentication error'
      );

    // Clear cart & navigate to order page
    dispatch(clearCart());
    navigate(`/order/${data._id}`);
  };

  return {
    placeOrderHandler,
    cart,
    isLoading,
    error,
  };
};

export default usePlaceOrderPage;
