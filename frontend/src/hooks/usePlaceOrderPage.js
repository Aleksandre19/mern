import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../slices/ordersApi';
import { clearCart } from '../slices/cart';
import { ErrorHandlerToast } from '../components/ErrorHandler';

const usePlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let cart = useSelector((state) => state.cart); // Get cart state
  const userInfo = useSelector((state) => state.auth.userInfo); // Get user info
  cart = { ...cart, user: userInfo }; // Add user info into cart

  // Place order endpoint
  const [createOrder, { isLoading: placeOrderLoading }] =
    useCreateOrderMutation();

  // Redirect if shipping address or payment methods are missing
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
      orderItems: cart.orderItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    });

    // Check errors
    if (error) return ErrorHandlerToast(error);

    // Clear cart & navigate to order page
    dispatch(clearCart());
    navigate(`/order/${data._id}`);
  };

  return {
    placeOrderHandler,
    cart,
    placeOrderLoading,
  };
};

export default usePlaceOrderPage;
