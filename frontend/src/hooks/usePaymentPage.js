import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePayment } from '../slices/cart';

const usePamentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Component based state
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  // Grab cart from Redux state
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart; // Grab shipping address

  // Redirect to cart page if there are no items
  // or reditect to shipping page if address is missing
  useEffect(() => {
    if (cart.orderItems.length === 0) {
      navigate('/cart');
    } else if (!shippingAddress) navigate('/shipping');
  }, [shippingAddress, navigate]);

  // Submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    // Save payment method & redirect to place order page
    dispatch(savePayment(paymentMethod));
    navigate('/placeorder');
  };

  return { setPaymentMethod, submitHandler };
};

export default usePamentPage;
