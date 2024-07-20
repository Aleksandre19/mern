import { ListGroup } from 'react-bootstrap';
import Rating from '../Rating';
const ReviewsList = ({ product }) => {
  return (
    <ListGroup variant='flush'>
      {product.reviews.map((review) => (
        <ListGroup.Item key={review._id}>
          <strong>{review.name}</strong>
          <Rating value={review.rating} />
          <p>{review.createdAt.substring(0, 10)}</p>
          <p>{review.comment}</p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ReviewsList;
