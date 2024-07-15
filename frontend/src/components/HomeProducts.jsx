import { Row, Col } from 'react-bootstrap';
import Product from './Product';

const HomeProducts = ({ data }) => {
  return (
    <Row>
      {data.products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default HomeProducts;
