import { Row, Col } from 'react-bootstrap';
import Message from '../Message';
import ButtonWithLoader from '../ButtonWithLoader';

const AdminProductsHeader = ({
  getProductError,
  createProductLoading,
  createProductHandler,
}) => {
  return (
    <Row className='justify-content-between'>
      <Col>
        <h1>Products</h1>
      </Col>

      {getProductError && <Message variant='danger'>{getProductError}</Message>}

      <Col className='text-end'>
        <ButtonWithLoader
          loading={createProductLoading}
          text={'Create Product'}
          className='btn-sm m-3'
          onClick={createProductHandler}
        />
      </Col>
    </Row>
  );
};

export default AdminProductsHeader;
