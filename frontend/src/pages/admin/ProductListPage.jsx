import { useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import { useGetProductsQuery } from '../../slices/product';
import useProductListPage from '../../hooks/admin/useProductListPage';
import Paginate from '../../components/Paginate';

const ProductListPage = () => {
  // Get current page number
  const { pageNumber } = useParams();

  // Get current product
  const {
    data,
    isLoading: getProductLoading,
    error: getProductError,
    refetch,
  } = useGetProductsQuery({ pageNumber });

  // Current component custom hook
  const {
    deleteHandler,
    createProductHandler,
    createProductLoading,
    deleteProductLoading,
    createProductError,
    deleteProductError,
  } = useProductListPage(refetch);

  // Handle loadings
  if (getProductLoading || createProductLoading || deleteProductLoading)
    return <Loader />;

  // Handle errors
  if (getProductError || createProductError || deleteProductError)
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
            {data.products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
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
        <Paginate pages={data.pages} page={data.page} isAdmin={true} />
      </>
    </>
  );
};

export default ProductListPage;
