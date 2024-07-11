import { Link } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import usePayPal from '../hooks/usePayPal';
import Message from '../components/Message';
import Loader from '../components/Loader';

const OrderPage = () => {
  const {
    order,
    onApprove,
    onApproveTest,
    onError,
    isPaying,
    createOrder,
    deliverHandler,
    userInfo,
    isPending,
    isLoading,
    isDelivering,
    error,
  } = usePayPal();

  if (isLoading) return <Loader />;

  // Check errors
  if (error)
    return toast.error(
      error?.data ||
        error?.data?.message ||
        error.message ||
        'Authentication error'
    );

  return (
    <>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Email: </strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
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
              {!order.isPaid && (
                <ListGroup.Item>
                  {isPaying && <Loader />}
                  {isPending && <Loader />}
                  <div>
                    <Button
                      onClick={onApproveTest}
                      style={{ marginBottom: '10px' }}
                    >
                      Test Pay Order
                    </Button>
                  </div>
                  <div>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  </div>
                </ListGroup.Item>
              )}

              {isDelivering && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
