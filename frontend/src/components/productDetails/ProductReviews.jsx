import { Row, Col } from 'react-bootstrap';
import Message from '../Message';
import Loader from '../Loader';

const ProductReviews = ({ isReviewLoading, product, children }) => {
  return (
    <Row className='review'>
      <Col md={6}>
        <h2>Reviews</h2>

        {isReviewLoading && <Loader />}

        {product.reviews.length === 0 && (
          <Message variant='info'>No Reviews</Message>
        )}

        {children}
      </Col>
    </Row>
  );
};

export default ProductReviews;
