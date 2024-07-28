import { Row, Col } from 'react-bootstrap';
import Product from '../main/Product';

const ProductsList = ({ data }) => {
  return (
    <Col sm={12}>
      <Row>
        {data.products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default ProductsList;
