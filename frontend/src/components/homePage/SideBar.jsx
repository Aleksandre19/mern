import { Col, ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../slices/categoryApi';
import ErrorHandler from '../general/ErrorHandler';
import Loader from '../general/Loader';
import { useLocationContext } from '../../contexts';

const SideBar = () => {
  // Get current location
  const { isHomePage, search } = useLocationContext();

  const { data, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <Loader />;

  if (error) return ErrorHandler(error);
  return (
    <Col
      lg={3}
      className={`${search ? 'd-none' : 'd-none d-lg-block sidebar'}`}
    >
      <ListGroup variant='flush'>
        <ListGroup.Item
          variant='dark'
          className={`${isHomePage ? 'active mt-5 rounded-top-start' : 'mt-5 rounded-top-start'}`}
        >
          <Link to='/'>All Products</Link>
        </ListGroup.Item>

        {data?.map((category) => (
          <ListGroup.Item
            key={category._id}
            variant='dark'
            className={`${location.pathname.includes(category.name) ? 'active' : ''}`}
          >
            <Link to={`/category/${category.name}`}>
              {category.friendly_name}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  );
};

export default SideBar;
