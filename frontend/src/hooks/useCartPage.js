import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeCart } from '../slices/cart';

const useCartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Grab order items
  const { orderItems } = useSelector((state) => state.cart);

  // Add to cart
  const addToCartHandler = async (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };

  // Remove from cart
  const removeCartHandler = async (id) => {
    dispatch(removeCart(id));
  };

  // Chackout
  const chackoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return {
    orderItems,
    addToCartHandler,
    removeCartHandler,
    chackoutHandler,
  };
};

export default useCartPage;
