import { Row, Col } from 'react-bootstrap';
import { useLocationContext } from '../../contexts';

const ProductsHeader = ({ children }) => {
  const { search } = useLocationContext();

  return (
    <Col
      lg={search ? 12 : 9}
      className='p-4 rounded-4 bsh'
      style={{ backgroundColor: '#F7FAFC' }}
    >
      <Row>{children}</Row>
    </Col>
  );
};

export default ProductsHeader;
