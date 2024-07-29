import { Link } from 'react-router-dom';
import {
  Carousel,
  Image,
  Row,
  Col,
  ListGroup,
  Button,
  Container,
} from 'react-bootstrap';
import Rating from '../main/Rating';
import Loader from '../general/Loader';
import ErrorHandler from '../general/ErrorHandler';
import { useGetTopProductsQuery } from '../../slices/product';

const ProductsCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return <Loader />;

  if (error) return ErrorHandler(error);

  return (
    <Container className='pt-3 pb-5'>
      <Carousel className='my-4'>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Row>
              <Col lg={8} className='px-4 py-2'>
                <h1>{product.name}</h1>
                <p className='text-xl'>{product.description}</p>
                <Row>
                  <Col>
                    <h2 className='mt-4'>${product.price}</h2>
                  </Col>
                  <Col className='d-flex justify-content-center align-items-center button-container'>
                    <Button type='button' size={'lg'}>
                      Add To Cart
                    </Button>
                  </Col>
                </Row>
              </Col>

              <Col lg={4} className='text-center'>
                <Link to={`/product/${product._id}`}>
                  <Image src={product.image} alt={product.name} fluid />
                </Link>
              </Col>
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default ProductsCarousel;
