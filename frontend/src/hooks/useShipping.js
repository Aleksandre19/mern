import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cart';

const useShipping = () => {
  // Grab Shipping Address from Redux Store
  const cart = useSelector((state) => state.cart);
  const { orderItems, shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect back to cart page if cart is empty
  useEffect(() => {
    if (orderItems.length === 0) navigate('/cart');
  }, [orderItems, navigate]);

  // Component base state
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const submitHandler = (e) => {
    e.preventDefault();

    // Save shipping address to Redux store and redirect to payment page
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return {
    address,
    setAddress,
    city,
    setCity,
    postalCode,
    setPostalCode,
    country,
    setCountry,
    submitHandler,
  };
};

export default useShipping;
