import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ButtonWithLoader from '../general/ButtonWithLoader';

const AdminProductsTabel = ({ data, deleteProductLoading, deleteHandler }) => {
  return (
    <Table striped bordered hover responsive className='table-sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>PRICE</th>
          <th>CATEGORY</th>
          <th>EDIT/DELETE</th>
        </tr>
      </thead>
      <tbody>
        {data.products.map((product) => (
          <tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.category.friendly_name}</td>
            <td>
              <LinkContainer to={`/admin/product/${product._id}/edit`}>
                <Button variant='light' className='btn-sm mx-2'>
                  <FaEdit />
                </Button>
              </LinkContainer>
              <ButtonWithLoader
                loading={deleteProductLoading}
                text={<FaTrash style={{ color: 'white' }} />}
                variant='danger'
                className='btn-sm'
                onClick={() => deleteHandler(product._id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminProductsTabel;
