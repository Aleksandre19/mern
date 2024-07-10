import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { Form, Button, Row, Col } from 'react-bootstrap';
import useRegisterPageLogic from '../hooks/useRgisterPageLogic';

const RegisterPage = () => {
  const {
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
  } = useRegisterPageLogic();

  return (
    <FormContainer>
      <h1>Sing Up</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group controlId='confirmPassword' className='my-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>
          Sing Up
        </Button>

        {isLoading && <Loader />}
      </Form>
      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
