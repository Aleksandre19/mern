import { Col, ListGroup } from 'react-bootstrap';
const OrderInfo = ({ children }) => {
  return (
    <Col md={8}>
      <ListGroup variant='flush'>{children}</ListGroup>
    </Col>
  );
};

export default OrderInfo;
