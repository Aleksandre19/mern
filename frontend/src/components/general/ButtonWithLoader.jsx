import { Spinner, Button } from 'react-bootstrap';
const ButtonWithLoader = ({ loading, text, type = 'submit', ...styles }) => {
  return (
    <>
      {loading ? (
        <Button type={type} variant='primary' {...styles} disabled>
          <Spinner
            as='span'
            animation='border'
            size='sm'
            role='status'
            aria-hidden='true'
            style={{
              marginRight: '10px',
            }}
          />
          {text}...
        </Button>
      ) : (
        <Button type='submit' variant='primary' {...styles}>
          {text}
        </Button>
      )}
    </>
  );
};

export default ButtonWithLoader;
