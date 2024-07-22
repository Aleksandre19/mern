import { Row, Col, ListGroup, Form, Card } from 'react-bootstrap';
import ButtonWithLoader from '../general/ButtonWithLoader';

const AddToCart = ({
  product,
  addToCartHandler,
  qty,
  setQty,
  isReviewLoading,
}) => {
  return (
    <Col md={3}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <Row>
              <Col>Price:</Col>
              <Col>
                <strong>${product.price}</strong>
              </Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>Status:</Col>

              <Col>
                <strong>
                  {product.countInStock >= 0 ? 'In Stock' : 'Out of Stock'}
                </strong>
              </Col>
            </Row>
          </ListGroup.Item>

          {product.countInStock > 0 && (
            <ListGroup.Item>
              <Row>
                <Col>Qty:</Col>

                <Col>
                  <Form.Control
                    as='select'
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
          )}

          <ListGroup.Item>
            <ButtonWithLoader
              loading={isReviewLoading}
              text='Add To Cart'
              className='btn-block'
              type='button'
              disabled={product.countInStock === 0}
              onClick={addToCartHandler}
            />
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default AddToCart;
