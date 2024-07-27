import { Col } from 'react-bootstrap';

const ProductsWrapper = ({ children }) => {
  return <Col lg={9}>{children}</Col>;
};

export default ProductsWrapper;
