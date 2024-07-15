import { ListGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../Message';
import ButtonWithLoader from '../ButtonWithLoader';

const WriteComment = ({
  userInfo,
  reviewSubmitHandler,
  rating,
  setRating,
  comment,
  setComment,
  isReviewLoading,
}) => {
  return (
    <ListGroup>
      <ListGroup.Item>
        <h2>Write a review</h2>

        {userInfo ? (
          <Form onSubmit={reviewSubmitHandler}>
            <Form.Group controlId='rating' className='my-2'>
              <Form.Label>Rating</Form.Label>

              <Form.Control
                as='select'
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value=''>Select...</option>
                <option value='1'>1 - Poor</option>
                <option value='2'>2 - Fair</option>
                <option value='3'>3 - Good</option>
                <option value='4'>4 - Very Good</option>
                <option value='5'>5 - Excellent</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='comment' className='my-2'>
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <ButtonWithLoader
              loading={isReviewLoading}
              text={'Submit'}
              type='submit'
            />
          </Form>
        ) : (
          <Message variant='info'>
            Please <Link to='/login'>Login</Link> to write a review
          </Message>
        )}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default WriteComment;
