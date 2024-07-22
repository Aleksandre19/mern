import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Spinner } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Loader from '../../components/general/Loader';
import Message from '../../components/general/Message';
import useUserListPage from '../../hooks/admin/useUserListPage';

const UserListPage = () => {
  // Custom hook
  const { users, deleteHandler, userLoading, userError, deleteLoading } =
    useUserListPage();

  // Handle loading and errors
  if (userLoading) return <Loader />;
  if (userError) return <Message variant='danger'>{userError.data}</Message>;

  return (
    <>
      <h1>Users</h1>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>

              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>

              <td>
                {user.isAdmin ? (
                  <FaCheck style={{ color: 'green' }} />
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </td>

              <td>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button variant='light' className='btn-sm'>
                    <FaEdit />
                  </Button>
                </LinkContainer>

                <Button
                  variant='danger'
                  className='btn-sm'
                  onClick={() => deleteHandler(user._id)}
                >
                  {deleteLoading ? (
                    <Spinner
                      as='span'
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                      style={{ marginRight: '10px' }}
                    />
                  ) : (
                    <FaTrash style={{ color: 'white' }} />
                  )}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserListPage;
