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
        <Row>
          <Col>Shipping: </Col>
          <Col> ${order.shippingPrice} </Col>
        </Row>
        <Row>
          <Col>Tax: </Col>
          <Col> ${order.taxPrice} </Col>
        </Row>
        <Row>
          <Col>Total Price: </Col>
          <Col> ${order.totalPrice} </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default CardSummary;
