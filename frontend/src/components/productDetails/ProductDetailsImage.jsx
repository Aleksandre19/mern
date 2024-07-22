import { Col, Image } from 'react-bootstrap';
import Meta from '../general/Meta';
const ProductDetailsImage = ({ product }) => {
  return (
    <>
      <Meta title={product.name} description={product.description} />
      <Col md={5}>
        <Image src={product.image} alt={product.name} fluid />
      </Col>
    </>
  );
};

export default ProductDetailsImage;
