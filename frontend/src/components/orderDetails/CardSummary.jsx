import { ListGroup, Row, Col } from 'react-bootstrap';
const CardSummary = ({ order }) => {
  return (
    <>
      <ListGroup.Item>
        <h2>Order Summary</h2>
      </ListGroup.Item>

      <ListGroup.Item>
        <Row>
          <Col>Items: </Col>
          <Col> ${order.itemsPrice} </Col>
        </Row>
      </ListGroup.Item>

      <ListGroup.Item>
        <Row>
          <Col>Shipping: </Col>
          <Col> ${order.shippingPrice} </Col>
        </Row>
      </ListGroup.Item>

      <ListGroup.Item>
        <Row>
          <Col>Tax: </Col>
          <Col> ${order.taxPrice} </Col>
        </Row>
      </ListGroup.Item>

      <ListGroup.Item>
        <Row>
          <Col>Total Price: </Col>
          <Col> ${order.totalPrice} </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default CardSummary;
