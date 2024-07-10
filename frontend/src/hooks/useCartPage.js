import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeCart } from '../slices/cart';

const useCartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const card = useSelector((state) => state.cart);
  const { cartItems } = card;

  // ?? async
  const addToCartHandler = async (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const removeCartHandler = async (id) => {
    dispatch(removeCart(id));
  };

  const chackoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return {
    cartItems,
    addToCartHandler,
    removeCartHandler,
    chackoutHandler,
  };
};

export default useCartPage;
