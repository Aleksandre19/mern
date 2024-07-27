import { Row, Col } from 'react-bootstrap';
import Product from '../main/Product';

const ProductsList = ({ data }) => {
  return (
    <Row>
      {data.products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={4}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductsList;
