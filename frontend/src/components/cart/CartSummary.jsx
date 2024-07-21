import { Col, ListGroup, Button, Card } from 'react-bootstrap';

const CartSummary = ({ orderItems, chackoutHandler }) => {
  return (
    <Col md={4}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>
              Subtotal ({orderItems.reduce((a, i) => a + i.qty, 0)}) Items
            </h2>
            ${orderItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2)}
          </ListGroup.Item>

          <ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              disabled={orderItems.length === 0}
              onClick={chackoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default CartSummary;
