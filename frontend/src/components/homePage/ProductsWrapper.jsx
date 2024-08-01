import { Row, Col } from 'react-bootstrap';

const ProductsHeader = ({ children }) => {
  return (
    <Col
      lg={9}
      className='p-4 rounded-4'
      style={{ backgroundColor: '#F7FAFC' }}
    >
      <Row>{children}</Row>
    </Col>
  );
};

export default ProductsHeader;
