import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import truncate from '../../utils/truncate';
import { addToCart } from '../../slices/cart';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const addToCartHandler = async (product) => {
    dispatch(addToCart({ ...product, qty: 1 }));
    navigate('/cart');
  };

  if (isLoading) return <Loader />;

  if (error) return ErrorHandler(error);

  return (
    <Container className='pt-3 pb-5'>
      <Carousel className='my-4'>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Row>
              <Col lg={8} className='px-4 py-2'>
                {/* TITLE */}
                <h1>{product.name}</h1>

                {/* IMAGE FOR SMALL SCREENS */}
                <Col className='d-flex d-lg-none my-5 justify-content-center align-items-center'>
                  <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid />
                  </Link>
                </Col>

                {/* DESCRIPTION */}
                <p className='mb-5'>{truncate(product.description, 230)}</p>

                {/* PRICE AND CART BUTTON */}
                <Row>
                  {/* PRICE */}
                  <Col
                    sm={'auto'}
                    className='d-flex justify-content-right align-items-center'
                  >
                    <h2 className='mb-0'>${product.price}</h2>
                  </Col>

                  {/* CART BUTTON */}
                  <Col className='d-flex justify-content-right align-items-center'>
                    <Button
                      type='button'
                      size={'lg'}
                      className='p-3'
                      onClick={() => addToCartHandler(product)}
                    >
                      Add To Cart
                    </Button>
                  </Col>
                </Row>
              </Col>

              {/* IMAGE FOR LARGE SCREENS */}
              <Col
                lg={4}
                className='d-none d-lg-flex justify-content-right align-items-center'
              >
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
