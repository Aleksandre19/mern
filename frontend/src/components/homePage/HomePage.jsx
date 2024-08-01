import { Row } from 'react-bootstrap';

const HomePage = ({ children }) => {
  return (
    <Row className='g-0' style={{ marginTop: '-150px' }}>
      {children}
    </Row>
  );
};

export default HomePage;
