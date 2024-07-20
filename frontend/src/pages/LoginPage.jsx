import { Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import ButtonWithLoader from '../components/ButtonWithLoader';
import useLoginPage from '../hooks/useLoginPage';

const LoginPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    submitHandler,
    isLoading,
    redirect,
  } = useLoginPage();

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

        <ButtonWithLoader
          loading={isLoading}
          text={'Sing In'}
          className='mt-2'
        />
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
