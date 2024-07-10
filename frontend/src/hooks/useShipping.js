import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cart';

const useShipping = () => {
  // Grab Shipping Address from Redux Store
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAdress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) navigate('/cart');
  }, [cartItems, navigate]);

  // Component base state
  const [address, setAddress] = useState(shippingAdress?.address || '');
  const [city, setCity] = useState(shippingAdress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAdress?.postalCode || '');
  const [country, setCountry] = useState(shippingAdress?.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
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
