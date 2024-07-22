import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../slices/ordersApi';
import { clearCart } from '../slices/cart';
import { ErrorHandlerToast } from '../components/general/ErrorHandler';

const usePlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get cart state
  let cart = useSelector((state) => state.cart);

  // Redirect to cart page if there are no items
  // or reditect respectively to shipping or payment page if address
  // or payment method are missing
  useEffect(() => {
    if (cart.orderItems.length === 0) {
      navigate('/cart');
    } else if (!cart.shippingAddress) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAdress, navigate]);

  // Grab user info from the Redux state and add user info to it.
  const userInfo = useSelector((state) => state.auth.userInfo);
  cart = { ...cart, user: userInfo };

  // Place order endpoint
  const [createOrder, { isLoading: placeOrderLoading }] =
    useCreateOrderMutation();

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
