import { ListGroup, Col } from 'react-bootstrap';
import Rating from '../main/Rating';

const ProductDetails = ({ product }) => {
  return (
    <Col md={4}>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h3>{product.name}</h3>
        </ListGroup.Item>

        <ListGroup.Item>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </ListGroup.Item>

        <ListGroup.Item>Price ${product.price}</ListGroup.Item>

        <ListGroup.Item>Description: {product.description}</ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default ProductDetails;
