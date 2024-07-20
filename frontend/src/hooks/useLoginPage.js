import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/userApi';
import { setCredentials } from '../slices/auth';
import { ErrorHandlerToast } from '../components/ErrorHandler';
import { toast } from 'react-toastify';

const useLoginPage = () => {
  // Component base states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Login action
  const [login, { isLoading }] = useLoginMutation();

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

  // Authenticate user
  const submitHandler = async (e) => {
    e.preventDefault();

    // Login user
    const { error, data } = await login({ email, password });

    // Handle error
    if (error) return ErrorHandlerToast(error);

    // Set user info in local storage
    dispatch(setCredentials({ ...data }));

    // Welcome message and redirect user.
    toast.success(`Welcome back, ${data.name}`);
    navigate(redirect);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    submitHandler,
    redirect,
    isLoading,
  };
};

export default useLoginPage;
