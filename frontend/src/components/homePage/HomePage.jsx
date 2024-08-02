import { Row } from 'react-bootstrap';
import { useLocationContext } from '../../contexts';

const HomePage = ({ children }) => {
  // Get current location
  const { isHomePage, categories } = useLocationContext();

  return (
    <Row
      className='g-0'
      style={isHomePage || categories ? { marginTop: '-150px' } : {}}
    >
      {children}
    </Row>
  );
};

export default HomePage;
