import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderItems = ({ order }) => {
  return (
    <ListGroup.Item>
      <h2>Order Items</h2>
      {order.orderItems.map((item, index) => (
        <ListGroup.Item key={index}>
          <Row key={index}>
            <Col md={1}>
              <Image src={item.image} alt={item.name} fluid rounded />
            </Col>
            <Col>
              <Link to={`/product/${item._id}`}>{item.name}</Link>
            </Col>
            <Col md={4}>
              {item.qty} x {item.price} = ${item.qty * item.price}
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup.Item>
  );
};

export default OrderItems;
