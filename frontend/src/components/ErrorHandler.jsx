import Message from './Message';

const ErrorHandler = ({ error }) => {
  return error && <Message variant='danger'>{error.message}</Message>;
};

export default ErrorHandler;
