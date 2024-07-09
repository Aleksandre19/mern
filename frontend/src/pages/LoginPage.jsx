import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/userApi';
import { setCredentials } from '../slices/auth';
import { toast } from 'react-toastify';

const LoginPage = () => {
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

    const { error, data } = await login({ email, password });

    if (error)
      return toast.error(error?.data?.message || error.message || 'Authentication error');

    dispatch(setCredentials({ ...data }));
    toast.success(`Welcome back, ${data.name}`);
    navigate(redirect);
  };

  return (
    <FormContainer>
      <h1>Sing In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>
          Sing In
        </Button>

        {isLoading && <Loader />}
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : 'register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
