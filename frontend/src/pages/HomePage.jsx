import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import axios from 'axios';

import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setError('');
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latesr Products </h1>
      {error && <p>{error}</p>}
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
