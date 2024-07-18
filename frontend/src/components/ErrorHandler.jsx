import { toast } from 'react-toastify';
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
          error.error.data ||
          error.data}
      </Message>
    )
  );
};

const ErrorHandlerToast = (error) => {
  console.log('ErrorHandlerToast Error: ', error);
  return (
    error &&
    toast.error(
      error?.data?.message ||
        error?.error?.data?.message ||
        error.message ||
        error?.error?.error ||
        error?.error?.data ||
        error?.data
    )
  );
};

export { ErrorHandlerToast };
export default ErrorHandler;
