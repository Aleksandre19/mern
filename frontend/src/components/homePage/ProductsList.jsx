import { Row, Col } from 'react-bootstrap';
import Product from '../main/Product';
import { useLocationContext } from '../../contexts';

const ProductsList = ({ data }) => {
  const { search } = useLocationContext();
  return (
    <Col sm={12}>
      <Row>
        {data.products.map((product) => (
          <Col
            key={product._id}
            {...(search ? { sm: 12, md: 4, lg: 3 } : { sm: 12, md: 6, lg: 4 })}
          >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default ProductsList;
