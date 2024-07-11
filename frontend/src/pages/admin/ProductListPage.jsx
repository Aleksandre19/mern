import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import { useGetProductsQuery } from '../../slices/product';
import useProductListPage from '../../hooks/useProductListPage';

const ProductListPage = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  // Current component custom hook
  const { deleteHandler, createProductHandler } = useProductListPage(
    products,
    refetch
  );

  if (isLoading) return <Loader />;

  if (error)
    return toast.error(
      error?.data ||
        error?.data?.message ||
        error.message ||
        'Authentication error'
    );

  return (
    <>
      <Row className='justify-content-between'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='btn-sm m-3' onClick={createProductHandler}>
            <FaEdit /> Creare Product
          </Button>
        </Col>
      </Row>
      <>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}`}>
                    <Button variant='light' className='btn-sm mx-2'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    </>
  );
};

export default ProductListPage;
