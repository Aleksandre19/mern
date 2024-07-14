import { Col, Image } from 'react-bootstrap';
const ProductDetailsImage = ({ product }) => {
  return (
    <Col md={5}>
      <Image src={product.image} alt={product.name} fluid />
    </Col>
  );
};

export default ProductDetailsImage;
