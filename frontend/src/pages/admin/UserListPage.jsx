import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/userApi';

const UserListPage = () => {
  const {
    data: users,
    refetch,
    isLoading: userLoading,
    error: userError,
  } = useGetUsersQuery();

  const [deleteUser, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const { data, error } = await deleteUser(id);

      if (error) return toast.error(error?.data || error?.data?.message);

      refetch();
      toast.success(data);
    }
  };

  if (userLoading) return <Loader />;

  return (
    <>
      <h1>Users</h1>
      {deleteLoading && <Loader />}
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
                  <FaTrash style={{ color: 'white' }} />
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
