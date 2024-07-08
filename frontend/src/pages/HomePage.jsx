import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/product';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (error)
    return (
      <Message type='danger'>{error.data?.message || error.error}</Message>
    );

  if (isLoading) return <Loader />;

  return (
    <>
      <h1>Latesr Products </h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
