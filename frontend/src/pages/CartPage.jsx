import { Col, ListGroup, Button, Card } from 'react-bootstrap';
import { Cart } from '../components';
import { CartOrdersList } from '../components';
import { CartSummary } from '../components';
import useCartPage from '../hooks/useCartPage';

const CartPage = () => {
  const { orderItems, addToCartHandler, removeCartHandler, chackoutHandler } =
    useCartPage();

  return (
    <Cart>
      <CartOrdersList
        orderItems={orderItems}
        add={addToCartHandler}
        remove={removeCartHandler}
      />

      <CartSummary orderItems={orderItems} chackoutHandler={chackoutHandler} />
    </Cart>
  );
};

export default CartPage;
