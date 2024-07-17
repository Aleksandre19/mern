import Message from './Message';

const ErrorHandler = (error) => {
  console.log('ErrorHandler Error: ', error);
  return (
    error && (
      <Message variant='danger'>
        {error?.data?.message ||
          error?.error?.data?.message ||
          error.message ||
          error.error.error ||
          error.error.data}
      </Message>
    )
  );
};

export default ErrorHandler;
