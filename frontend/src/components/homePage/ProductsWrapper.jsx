import { Row, Col } from 'react-bootstrap';

const ProductsHeader = ({ children }) => {
  return (
    <Col lg={9}>
      <Row>{children}</Row>
    </Col>
  );
};

export default ProductsHeader;
