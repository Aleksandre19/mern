import Message from './Message';

const ErrorHandler = ({ error }) => {
  return (
    error && (
      <Message variant='danger'>{error?.data?.message || error.error}</Message>
    )
  );
};

export default ErrorHandler;
