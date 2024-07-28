import { Col } from 'react-bootstrap';

const ProductTitle = ({ title }) => {
  return (
    <Col sm={12} lg={8}>
      <h1>{title}</h1>
    </Col>
  );
};

export default ProductTitle;
