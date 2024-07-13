import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/userApi';
import { toast } from 'react-toastify';

const useProductEditPage = (
  name,
  setName,
  email,
  setEmail,
  isAdmin,
  setIsAdmin
) => {
  // User Id
  const { id: _id } = useParams();
  const navigate = useNavigate();

  // Find user by Id
  const {
    data: user,
    isLoading: userLoading,
    refetch,
    error: userError,
  } = useGetUserDetailsQuery(_id);

  // Update state
  useEffect(() => {
    if (!user) return;

    setName(user.name);
    setEmail(user.email);
    setIsAdmin(user.isAdmin);
  }, [user]);

  // User update endpoint
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    // Update user
    const { data, error } = await updateUser({ _id, name, email, isAdmin });

    // Handle error
    if (error) return toast.error(error?.data || error.data.message);

    // Handle success
    toast.success(data);
    refetch();
    navigate('/admin/userlist');
  };

  return {
    submitHandler,
    userLoading,
    updateLoading,
    userError,
  };
};

export default useProductEditPage;
