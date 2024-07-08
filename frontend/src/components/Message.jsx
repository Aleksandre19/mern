import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant} style={{ textAlign: 'center' }}>
      {children}
    </Alert>
  );
};

export default Message;
