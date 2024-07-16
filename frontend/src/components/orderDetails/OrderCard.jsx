import { Col, Card, ListGroup } from 'react-bootstrap';

const OrderCard = ({ children }) => {
  return (
    <Col md={4}>
      <Card>
        <ListGroup variant='flush'>{children}</ListGroup>
      </Card>
    </Col>
  );
};

export default OrderCard;
