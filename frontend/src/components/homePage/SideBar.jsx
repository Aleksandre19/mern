import { Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../slices/categoryApi';
import ErrorHandler from '../general/ErrorHandler';
import Loader from '../general/Loader';

const SideBar = () => {
  const { data, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <Loader />;

  if (error) return ErrorHandler(error);
  return (
    <Col lg={3}>
      <ListGroup variant='flush'>
        {data?.map((category) => (
          <ListGroup.Item key={category._id}>
            <Link>{category.friendly_name}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  );
};

export default SideBar;