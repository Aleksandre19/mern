import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/product';
import Paginate from '../components/Paginate';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import GoBackButton from '../components/GoBackButton';

const HomeScreen = () => {
  // Get page number
  const { pageNumber, keyword } = useParams();
  // Get products
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  // Handle error
  if (error)
    return (
      <Message type='danger'>{error.data?.message || error.error}</Message>
    );

  // Handle loading
  if (isLoading) return <Loader />;

  return (
    <>
      {keyword && <GoBackButton />}
      <h1>Latest Products </h1>
      <Row>
        {data.products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate pages={data.pages} page={data.page} keyword={keyword} />
    </>
  );
};

export default HomeScreen;
