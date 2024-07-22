import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/userApi';
import { setCredentials } from '../slices/auth';
import { useGetUsersOrdersQuery } from '../slices/ordersApi';
import { ErrorHandlerToast } from '../components/general/ErrorHandler';

const useProfilePage = () => {
  const dispatch = useDispatch();

  // Component based state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Grab user info from store
  const { userInfo } = useSelector((state) => state.auth);

  // Set name and email to the inputs
  useEffect(() => {
    if (!userInfo) return;

    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo, userInfo.name, userInfo.email]);

  // Get user orders endpoint
  const {
    data: orders,
    isLoading: displayOrdersLoading,
    error: displayOrdersError,
  } = useGetUsersOrdersQuery();

  // Profile updater endpoint
  const [updateProfile, { isLoading: updateProfileLoading }] =
    useProfileMutation();

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
    if (error) return ErrorHandlerToast(error);

    // Update local storage with new credentials
    dispatch(setCredentials(data));
    toast.success('Profile updated successfully');
  };

  return {
    orders,
    submitHandler,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    updateProfileLoading,
    displayOrdersLoading,
    displayOrdersError,
  };
};

export default useProfilePage;
