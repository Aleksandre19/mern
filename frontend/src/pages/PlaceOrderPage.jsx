import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import usePlaceOrderPage from '../hooks/usePlaceOrderPage';

function PlaceOrderPage() {
  const { placeOrderHandler, cart, isLoading, error } = usePlaceOrderPage();
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2> Shipping </h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2> Payment Method </h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2> Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup.Item variant='flush'>
                  {cart.cartItems.map((item, index) => (
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
                  ))}
                </ListGroup.Item>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Items: </Col>
                  <Col> ${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Shipping: </Col>
                  <Col> ${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Tax: </Col>
                  <Col> ${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Total: </Col>
                  <Col> ${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item>
                  <Message variant='danger'>{error?.data}</Message>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>

                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderPage;
