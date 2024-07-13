import { toast } from 'react-toastify';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/userApi';

const useUserListPage = () => {
  // Find users
  const {
    data: users,
    refetch,
    isLoading: userLoading,
    error: userError,
  } = useGetUsersQuery();

  // Delete user endpoint
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  // Delete user handler
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // Delete user
      const { data, error } = await deleteUser(id);

      // Handle error
      if (error) return toast.error(error?.data || error?.data?.message);

      // Refetch users data and send repsonse
      refetch();
      toast.success(data);
    }
  };

  return {
    users,
    deleteHandler,
    userLoading,
    userError,
    deleteLoading,
  };
};

export default useUserListPage;
