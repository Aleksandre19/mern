import { Link } from 'react-router-dom';
import { Carousel, Image, Row, Col, ListGroup } from 'react-bootstrap';
import Rating from './Rating';
import Loader from './Loader';
import ErrorHandler from './ErrorHandler';
import { useGetTopProductsQuery } from '../slices/product';

const ProductsCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return <Loader />;

  if (error) return ErrorHandler(error);

  return (
    <Carousel className='my-4'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Row>
            <Col md={6}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className='carousel-caption'>
                  <h2>${product.price} </h2>
                </Carousel.Caption>
              </Link>
            </Col>
            <Col md={6} className='px-4 py-2'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductsCarousel;
