import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Form, Image } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

import IfEmptyCart from './IfEmptyCart';
const CartOrdersList = ({ orderItems, add, remove }) => {
  return (
    <Col md={8}>
      <h1 style={{ marginBottom: '20px' }}>Sopping Cart</h1>

      <IfEmptyCart itemsLenght={orderItems.length} />

      {orderItems.length > 0 && (
        <ListGroup variant='flush'>
          {orderItems.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>

                <Col md={3}>
                  <Link to={`/product/${item._id}`}>{item.name}</Link>
                </Col>

                <Col md={2}> ${item.price}</Col>

                <Col md={2}>
                  <Form.Control
                    as='select'
                    value={item.qty}
                    onChange={(e) => add(item, Number(e.target.value))}
                  >
                    {[...Array(item.countInStock).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>

                <Col md={2}>
                  <Button
                    type='button'
                    variant='light'
                    onClick={() => remove(item._id)}
                  >
                    <FaTrash />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Col>
  );
};

export default CartOrdersList;
