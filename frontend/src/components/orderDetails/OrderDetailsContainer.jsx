import { Row } from 'react-bootstrap';

const OrderDetailsContainer = ({ orderId, children }) => {
  return (
    <>
      <h1>Order: {orderId}</h1>
      <Row>{children}</Row>;
    </>
  );
};

export default OrderDetailsContainer;
