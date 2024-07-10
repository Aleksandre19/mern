import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/userApi';
import { setCredentials } from '../slices/auth';
import { toast } from 'react-toastify';

const useRegisterPage = () => {
  // Component base states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Login action
  const [register, { isLoading }] = useRegisterMutation();

  // User info from local storage
  const { userInfo } = useSelector((state) => state.auth);

  // Check a ``redirect` query parameter in the URL
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  // Redirect if user is authenticated
  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  // Register user
  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if password matches
    if (password !== confirmPassword) return toast.error('Passwords do not match');

    // Register user
    const { error, data } = await register({ name, email, password });

    // Check error
    if (error)
      return toast.error(
        error?.data || error?.data?.message || error.message || 'Authentication error'
      );

    // Set user credentials and redirect
    dispatch(setCredentials({ ...data }));
    toast.success(`Welcome, ${data.name}`);
    navigate(redirect);
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    submitHandler,
    isLoading,
    Link,
    redirect,
  };
};

export default useRegisterPage;
