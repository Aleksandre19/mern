import Message from '../Message';
import { Link } from 'react-router-dom';

const IfEmptyCart = ({ itemsLength }) => {
  return (
    itemsLength === 0 && (
      <Message variant='info'>
        Your cart is empty. &nbsp;
        <Link to='/'> Go Back</Link>
      </Message>
    )
  );
};

export default IfEmptyCart;
