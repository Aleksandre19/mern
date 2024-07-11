import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/userApi';
import { setCredentials } from '../slices/auth';
import { useGetUsersOrdersQuery } from '../slices/ordersApi';

const useProfilePage = (
  name,
  email,
  password,
  confirmPassword,
  setName,
  setEmail
) => {
  // Grab user info from store
  const { userInfo } = useSelector((state) => state.auth);

  // Profile updater action
  const [updateProfile, { isLoading }] = useProfileMutation();

  const dispatch = useDispatch();

  // Set name and email to the inputs
  useEffect(() => {
    if (!userInfo) return;
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo, userInfo.name, userInfo.email]);

  // Get user orders action
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetUsersOrdersQuery();

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if password matches
    if (password !== confirmPassword)
      return toast.error('Passwords do not match');

    // Update profile
    const { data, error } = await updateProfile({
      _id: userInfo._id,
      name,
      email,
      password,
    });

    // Handle errors
    if (error)
      return toast.error(
        error?.data ||
          error?.data?.message ||
          error.message ||
          'Could not update profile'
      );

    // Update local storage with new credentials
    dispatch(setCredentials(data));
    toast.success('Profile updated successfully');
  };

  return {
    orders,
    ordersLoading,
    ordersError,
    isLoading,
    submitHandler,
  };
};

export default useProfilePage;
